package server;

public class OrderDto {

	private final int customerId;
	private final int[] itemIds;
	private final int[] itemCounts;

	public OrderDto(int customerId, int[] itemIds, int[] itemCounts) {
		this.customerId = customerId;
		this.itemIds = itemIds;
		this.itemCounts = itemCounts;
	}

	public int getCustomerId() {
		return this.customerId;
	}

	public int[] getItemIds() {
		return this.itemIds;
	}

	public int[] getItemCounts() {
		return this.itemCounts;
	}

}
