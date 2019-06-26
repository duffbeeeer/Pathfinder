package com.example.demo;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ItemRepository extends MongoRepository<ApplicationItem, Long>{
	
	
}
