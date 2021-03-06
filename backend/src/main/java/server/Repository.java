package server;

import com.scalar.db.api.DistributedTransaction;
import com.scalar.db.api.DistributedTransactionManager;
import com.scalar.db.api.Get;
import com.scalar.db.api.Put;
import com.scalar.db.api.Result;
import com.scalar.db.api.Scan;
import com.scalar.db.config.DatabaseConfig;
import com.scalar.db.exception.transaction.TransactionException;
import com.scalar.db.io.Key;
import com.scalar.db.io.TextValue;
import com.scalar.db.service.TransactionFactory;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import server.Customer;

public class Repository implements AutoCloseable {

  private final DistributedTransactionManager manager;

  public Repository() throws IOException {
    // Create a transaction manager object
    TransactionFactory factory =
        new TransactionFactory(new DatabaseConfig(new File("database.properties")));
    manager = factory.getTransactionManager();
  }

  public void loadInitialData() throws TransactionException {
    DistributedTransaction transaction = null;
    try {
      transaction = manager.start();
      loadCustomerIfNotExists(transaction, 1, "Yamada Taro", 10000, 0);
      loadCustomerIfNotExists(transaction, 2, "Yamada Hanako", 10000, 0);
      loadCustomerIfNotExists(transaction, 3, "Suzuki Ichiro", 10000, 0);
      loadItemIfNotExists(transaction, 1, "Pepperoni supreme Pizza", 1100);
      loadItemIfNotExists(transaction, 2, "Panner Tikka Pizza", 1500);
      loadItemIfNotExists(transaction, 3, "Seattle Special Pizza", 1400);
      loadItemIfNotExists(transaction, 4, "Tandoori Chicken Pizza", 1300);
      loadItemIfNotExists(transaction, 5, "BBQ Chicken Pizza", 1200);
      transaction.commit();
    } catch (TransactionException e) {
      if (transaction != null) {
        // If an error occurs, abort the transaction
        transaction.abort();
      }
      throw e;
    }
  }

  private void loadCustomerIfNotExists(
      DistributedTransaction transaction,
      int customerId,
      String name,
      int creditLimit,
      int creditTotal)
      throws TransactionException {
    Optional<Result> customer =
        transaction.get(
            new Get(new Key("customer_id", customerId))
                .forNamespace("customer")
                .forTable("customers"));
    if (!customer.isPresent()) {
      transaction.put(
          new Put(new Key("customer_id", customerId))
              .withValue("name", name)
              .withValue("credit_limit", creditLimit)
              .withValue("credit_total", creditTotal)
              .forNamespace("customer")
              .forTable("customers"));
    }
  }

  private void loadItemIfNotExists(
      DistributedTransaction transaction, int itemId, String name, int price)
      throws TransactionException {
    Optional<Result> item =
        transaction.get(
            new Get(new Key("item_id", itemId)).forNamespace("order").forTable("items"));
    if (!item.isPresent()) {
      transaction.put(
          new Put(new Key("item_id", itemId))
              .withValue("common_key", "common_key")
              .withValue("name", name)
              .withValue("price", price)
              .forNamespace("order")
              .forTable("items"));
    }
  }

  public Customer getCustomerInfo(int customerId) throws TransactionException {
    DistributedTransaction transaction = null;
    try {
      // Start a transaction
      transaction = manager.start();

      // Retrieve the customer info for the specified customer ID from the customers table
      Optional<Result> customer =
          transaction.get(
              new Get(new Key("customer_id", customerId))
                  .forNamespace("customer")
                  .forTable("customers"));

      if (!customer.isPresent()) {
        // If the customer info the specified customer ID doesn't exist, throw an exception
        throw new RuntimeException("Customer not found");
      }

      // Commit the transaction (even when the transaction is read-only, we need to commit)
      transaction.commit();

      return new Customer(
          customerId,
          customer.get().getValue("name").get().getAsString().get(),
          customer.get().getValue("credit_limit").get().getAsInt(),
          customer.get().getValue("credit_total").get().getAsInt());
    } catch (Exception e) {
      if (transaction != null) {
        // If an error occurs, abort the transaction
        transaction.abort();
      }
      throw e;
    }
  }

  public String placeOrder(int customerId, int[] itemIds, int[] itemCounts)
      throws TransactionException {
    assert itemIds.length == itemCounts.length;

    DistributedTransaction transaction = null;
    try {
      String orderId = UUID.randomUUID().toString();

      // Start a transaction
      transaction = manager.start();

      // Put the order info into the orders table
      transaction.put(
          new Put(
              new Key("customer_id", customerId),
              new Key("timestamp", System.currentTimeMillis()))
              .withValue("order_id", orderId)
              .forNamespace("order")
              .forTable("orders"));

      int amount = 0;
      for (int i = 0; i < itemIds.length; i++) {
        int itemId = itemIds[i];
        int count = itemCounts[i];

        // Put the order statement into the statements table
        transaction.put(
            new Put(new Key("order_id", orderId), new Key("item_id", itemId))
                .withValue("count", count)
                .forNamespace("order")
                .forTable("statements"));

        // Retrieve the item info from the items table
        Optional<Result> item =
            transaction.get(
                new Get(new Key("item_id", itemId)).forNamespace("order").forTable("items"));
        if (!item.isPresent()) {
          throw new RuntimeException("Item not found");
        }

        // Calculate the total amount
        amount += item.get().getValue("price").get().getAsInt() * count;
      }

      // Check if the credit total exceeds the credit limit after payment
      Optional<Result> customer =
          transaction.get(
              new Get(new Key("customer_id", customerId))
                  .forNamespace("customer")
                  .forTable("customers"));
      if (!customer.isPresent()) {
        throw new RuntimeException("Customer not found");
      }
      int creditLimit = customer.get().getValue("credit_limit").get().getAsInt();
      int creditTotal = customer.get().getValue("credit_total").get().getAsInt();
      if (creditTotal + amount > creditLimit) {
        throw new RuntimeException("Credit limit exceeded");
      }

      // Update credit_total for the customer
      transaction.put(
          new Put(new Key("customer_id", customerId))
              .withValue("credit_total", creditTotal + amount)
              .forNamespace("customer")
              .forTable("customers"));

      // Commit the transaction
      transaction.commit();

      // Return the order id
      return orderId;
    } catch (Exception e) {
      if (transaction != null) {
        // If an error occurs, abort the transaction
        transaction.abort();
      }
      throw e;
    }
  }

  private OrderResponseDto getOrder(DistributedTransaction transaction, String orderId)
      throws TransactionException {
    // Retrieve the order info for the order ID from the orders table
    Optional<Result> order =
        transaction.get(
            new Get(new Key("order_id", orderId)).forNamespace("order").forTable("orders"));
    if (!order.isPresent()) {
      throw new RuntimeException("Order not found");
    }

    int customerId = order.get().getValue("customer_id").get().getAsInt();

    // Retrieve the customer info for the specified customer ID from the customers table
    Optional<Result> customer =
        transaction.get(
            new Get(new Key("customer_id", customerId))
                .forNamespace("customer")
                .forTable("customers"));

    // Retrieve the order statements for the order ID from the statements table
    List<Result> statements =
        transaction.scan(
            new Scan(new Key("order_id", orderId)).forNamespace("order").forTable("statements"));

    // Make the statements JSONs
    ArrayList<StatementDto> statementDtos = new ArrayList<>();
    int total = 0;
    for (Result statement : statements) {
      int itemId = statement.getValue("item_id").get().getAsInt();

      // Retrieve the item data from the items table
      Optional<Result> item =
          transaction.get(
              new Get(new Key("item_id", itemId)).forNamespace("order").forTable("items"));
      if (!item.isPresent()) {
        throw new RuntimeException("Item not found");
      }

      int price = item.get().getValue("price").get().getAsInt();
      int count = statement.getValue("count").get().getAsInt();

      StatementDto statementDto = new StatementDto(
        itemId,
        item.get().getValue("name").get().getAsString().get(),
        price,
        count,
        price * count
      );

      statementDtos.add(statementDto);

      total += price * count;
    }

    // Return the order info as a JSON format
    return new OrderResponseDto(
      orderId,
      order.get().getValue("timestamp").get().getAsLong(),
      customerId,
      customer.get().getValue("name").get().getAsString().get(),
      statementDtos,
      total
    );
  }

  public OrderResponseDto getOrderById(String id) throws TransactionException {
    DistributedTransaction transaction = null;
    try {
      // Start a transaction
      transaction = manager.start();

      // Get an order JSON for the specified order ID
      OrderResponseDto order = getOrder(transaction, id);

      // Commit the transaction (even when the transaction is read-only, we need to commit)
      transaction.commit();

      // Return the order info as a JSON format
      return order;
    } catch (Exception e) {
      if (transaction != null) {
        // If an error occurs, abort the transaction
        transaction.abort();
      }
      throw e;
    }
  }

  public ArrayList<OrderResponseDto> getOrdersByCustomerId(int customerId) throws TransactionException {
    DistributedTransaction transaction = null;
    try {
      // Start a transaction
      transaction = manager.start();

      // Retrieve the order info for the customer ID from the orders table
      List<Result> orders =
          transaction.scan(
              new Scan(new Key("customer_id", customerId))
                  .forNamespace("order")
                  .forTable("orders"));

      // Make order JSONs for the orders of the customer
      ArrayList<OrderResponseDto> orderDtos = new ArrayList<>();
      for (Result order : orders) {
        orderDtos.add(
            getOrder(transaction, order.getValue("order_id").get().getAsString().get()));
      }

      // Commit the transaction (even when the transaction is read-only, we need to commit)
      transaction.commit();

      // Return the order info as a JSON format
      return orderDtos;
    } catch (Exception e) {
      if (transaction != null) {
        // If an error occurs, abort the transaction
        transaction.abort();
      }
      throw e;
    }
  }

  public void repayment(int customerId, int amount) throws TransactionException {
    DistributedTransaction transaction = null;
    try {
      // Start a transaction
      transaction = manager.start();

      // Retrieve the customer info for the specified customer ID from the customers table
      Optional<Result> customer =
          transaction.get(
              new Get(new Key("customer_id", customerId))
                  .forNamespace("customer")
                  .forTable("customers"));
      if (!customer.isPresent()) {
        throw new RuntimeException("Customer not found");
      }

      int updatedCreditLimit = customer.get().getValue("credit_total").get().getAsInt() - amount;

      // Check if over repayment or not
      if (updatedCreditLimit < 0) {
        throw new RuntimeException("Over repayment");
      }

      // Reduce credit_total in the customer
      transaction.put(
          new Put(new Key("customer_id", customerId))
              .withValue("credit_total", updatedCreditLimit)
              .forNamespace("customer")
              .forTable("customers"));

      // Commit the transaction
      transaction.commit();
    } catch (Exception e) {
      if (transaction != null) {
        // If an error occurs, abort the transaction
        transaction.abort();
      }
      throw e;
    }
  }

  public ArrayList<ItemDto> getItems() throws TransactionException {
    DistributedTransaction transaction = null;
    try {
      transaction = manager.start();

      List<Result> items = transaction.scan(
                      new Scan(new Key(new TextValue("common_key", "common_key")))
                              .forNamespace("order")
                              .forTable("items"));

      ArrayList<ItemDto> itemDtos = new ArrayList<ItemDto>();
      for (Result item : items) {
        int itemId = item.getValue("item_id").get().getAsInt();
        String name = item.getValue("name").get().getAsString().get();
        int price = item.getValue("price").get().getAsInt();

        itemDtos.add(new ItemDto(itemId, name, price));
      }

      transaction.commit();

      return itemDtos;
    } catch (Exception e) {
      if (transaction != null) {
        transaction.abort();
      }
      throw e;
    }
  }

  public ItemDto getItem(int itemId) throws TransactionException {
    DistributedTransaction transaction = null;
    try {
      transaction = manager.start();

      Optional<Result> item = transaction.get(
              new Get(new Key("item_id", itemId)).forNamespace("order").forTable("items"));

      int resultItemId = item.get().getValue("item_id").get().getAsInt();
      String name = item.get().getValue("name").get().getAsString().get();
      int price = item.get().getValue("price").get().getAsInt();

      transaction.commit();

      return new ItemDto(resultItemId, name, price);
    } catch (Exception e) {
      if (transaction != null) {
        transaction.abort();
      }
      throw e;
    }
  }

  @Override
  public void close() {
    manager.close();
  }
}
