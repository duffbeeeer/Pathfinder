package com.example.demo;

import static com.example.demo.SecurityConstants.HEADER_STRING;
import static com.example.demo.SecurityConstants.SECRET;
import static com.example.demo.SecurityConstants.TOKEN_PREFIX;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/Vendor")
public class Vendor {

	private ItemRepository itemRepo;
	private UserRepostirory userRepo;

	public Vendor(ItemRepository itemRepo, Receptionist receptionist, UserRepostirory userRepo) {
		this.itemRepo = itemRepo;
		this.userRepo = userRepo;
	}

	@GetMapping("/showAll")
	public List<ApplicationItem> enterShop(@RequestHeader(HEADER_STRING) String token) {
		String userName = JWT.require(Algorithm.HMAC512(SECRET.getBytes())).build()
				.verify(token.replaceAll(TOKEN_PREFIX, "")).getSubject();
		ApplicationUser user = userRepo.findByUsername(userName);
		Long budget = user.showBudget();

		List<ApplicationItem> items = itemRepo.findAll();

		for (ApplicationItem i : items)
			if (i.isAffordable(budget))
				i.addTransactionToken();
		// or link to UserController.buy()!!
		// or set flag or something
		
		
		return items;
	}

	@PostMapping("/addItemToShop")
	public void addToShop(@RequestBody ApplicationItem item) {
		ApplicationItem i = item;
		itemRepo.save(item);
	}
}
