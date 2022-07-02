package server;

import java.util.ArrayList;

public class OrderResponseDto {

    private final String id;
    private final long timestamp;
    private final int customerId;
    private final String customerName;
    private final ArrayList<StatementDto> statements;
    private final int total;

    public OrderResponseDto(
        String id,
        long timestamp,
        int customerId,
        String customerName,
        ArrayList<StatementDto> statements,
        int total
    ) {
        this.id = id;
        this.timestamp = timestamp;
        this.customerId = customerId;
        this.customerName = customerName;
        this.statements = statements;
        this.total = total;
    }

    public String getId() {
        return this.id;
    };
    public long getTimestamp() {
        return this.timestamp;
    };
    public int getCustomerId() {
        return this.customerId;
    };
    public String getCustomerName() {
        return this.customerName;
    };
    public ArrayList<StatementDto> getStatements() {
        return this.statements;
    };
    public int getTotal() {
        return this.total;
    };

}
