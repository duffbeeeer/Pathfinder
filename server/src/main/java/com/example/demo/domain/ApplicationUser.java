package com.example.demo;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.validator.constraints.UniqueElements;

public class ApplicationUser {

	private String id;
	@UniqueElements
	private String username;
	private String password;
	private List<ApplicationItem> rewards;
	private List<ApplicationItem> achievements;

	

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	// ------------

	public Long showBudget() {
	//	return achievements.stream().map(a -> a.getPrice()).reduce(0L, Long::sum)
	//			- rewards.stream().map(r -> r.getPrice()).reduce(0L, Long::sum);
		return 1L;  
	}

//----------------refactor
	public List<ApplicationItem> getRewards() {
		return rewards;
	}

	public void setRewards(List<ApplicationItem> rewards) {
		this.rewards = rewards;
	}

	public List<ApplicationItem> getAchievements() {
		return achievements;
	}

	public void setAchievements(List<ApplicationItem> achievements) {
		this.achievements = achievements;
	}

	public void addAchievement(ApplicationItem achievement) {
		if (this.achievements == null)
			this.achievements = new ArrayList<>();
		this.achievements.add(achievement);
	}

	public void addReward(ApplicationItem reward) {
		if (this.rewards == null)
			this.rewards = new ArrayList<>();
		 this.rewards.add(reward);
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
}
