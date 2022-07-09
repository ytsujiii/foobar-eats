package server;

public class ItemDto {

    private final int itemId;
    private final String name;
    private final int price;

    public ItemDto(int itemId, String itemName, int price) {
        this.itemId = itemId;
        this.name = itemName;
        this.price = price;
    }

    public int getItemId() {
        return this.itemId;
    }
    public String getName() {
        return this.name;
    }
    public int getPrice() {
        return this.price;
    }

}
