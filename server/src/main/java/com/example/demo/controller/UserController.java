package com.example.demo;

import static com.example.demo.SecurityConstants.HEADER_STRING;
import static com.example.demo.SecurityConstants.SECRET;
import static com.example.demo.SecurityConstants.TOKEN_PREFIX;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
@RequestMapping("/U")
//todo pls pls another layer or link magic!
public class UserController {
	private UserRepostirory userRepo;
	private BCryptPasswordEncoder encoder;

	public UserController(UserRepostirory userRepo, Receptionist receptionist, BCryptPasswordEncoder encoder) {
		this.userRepo = userRepo;
		this.encoder = encoder;
	}

	@PostMapping("/sign-up")
	public void signUp(@RequestBody ApplicationUser user) {
		user.setPassword(encoder.encode(user.getPassword()));
		userRepo.save(user);
		// todo call login(->return token) now, to save a step? or return link to login?
		// frontend can signup.promise.then login
	}

	@PostMapping("/add")
	public void add(@RequestHeader(HEADER_STRING) String token, @RequestBody ApplicationItem achievement) {
		String userName = JWT.require(Algorithm.HMAC512(SECRET.getBytes())).build()
				.verify(token.replaceAll(TOKEN_PREFIX, "")).getSubject();

		ApplicationUser user = userRepo.findByUsername(userName);
		user.addAchievement(achievement);
		userRepo.save(user);
	}

	@PostMapping("/buy")
	public void buy(@RequestHeader(HEADER_STRING) String token, @RequestBody ApplicationItem reward) {
		String userName = JWT.require(Algorithm.HMAC512(SECRET.getBytes())).build()
				.verify(token.replaceAll(TOKEN_PREFIX, "")).getSubject();
		ApplicationUser user = userRepo.findByUsername(userName);

		// requested reward available?
		// and affordable?

		user.addReward(reward);
		userRepo.save(user);
	}

}