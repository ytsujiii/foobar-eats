package server;

public class Customer {

	private final long id;
	private final String name;
	private final int creditLimit;
	private final int creditTotal;

	public Customer(long id, String name, int creditLimit, int creditTotal) {
		this.id = id;
		this.name = name;
		this.creditLimit = creditLimit;
		this.creditTotal = creditTotal;
	}

	public long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public int getCreditLimit() {
		return creditLimit;
	}

	public int getCreditTotal() {
		return creditTotal;
	}
}
