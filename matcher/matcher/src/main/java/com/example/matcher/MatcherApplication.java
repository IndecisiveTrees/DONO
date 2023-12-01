package com.example.matcher;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;


@SpringBootApplication
@EnableMongoRepositories

public class MatcherApplication {
	public static void main(String[] args) {
		SpringApplication.run(MatcherApplication.class, args);
	}
}
