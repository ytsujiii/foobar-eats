package server;

public class StatementDto {

    private final int itemId;
    private final String itemName;
    private final int price;
    private final int count;
    private final int total;

    public StatementDto(int itemId, String itemName, int price, int count, int total) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.price = price;
        this.count = count;
        this.total = total;
    }

    public int getItemId() {
        return this.itemId;
    }
    public String getItemName() {
        return this.itemName;
    }
    public int getPrice() {
        return this.price;
    }
    public int getCount() {
        return this.count;
    }
    public int getTotal() {
        return this.total;
    }

}
