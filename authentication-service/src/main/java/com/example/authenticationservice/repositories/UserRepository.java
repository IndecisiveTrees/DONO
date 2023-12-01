package com.example.authenticationservice.repositories;

import com.example.authenticationservice.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
}
