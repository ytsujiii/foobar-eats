package server;

public class CustomerRepaymentRequestDto {

	private final int customerId;
	private final int amount;

	public CustomerRepaymentRequestDto(int customerId, int amount) {
		this.customerId = customerId;
		this.amount = amount;
	}

	public int getCustomerId() {
		return this.customerId;
	}

	public int getAmount() {
		return this.amount;
	}

}
