package com.example.demo;

public class ApplicationItem {

	private String name;
	private Long value;

	public ApplicationItem(String name, Long value) {
		this.setName(name);
		this.value = value;
	}

	public Long getValue() {
		return this.value;
	}

	public void setValue(Long value) {
		this.value = value;
	}

	public boolean isAffordable(Long budget) {
		// TODO Auto-generated method stub
		return false;
	}

	public void addTransactionToken() {
		// TODO Auto-generated method stub

	}

	public void addBuyItemLink() {
		// TODO Auto-generated method stub

	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
