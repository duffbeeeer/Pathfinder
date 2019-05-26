package com.example.demo;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepostirory extends MongoRepository<ApplicationUser, Long>{

	ApplicationUser findByUsername(String username);
	
}



			 