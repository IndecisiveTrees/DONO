package com.example.matcher.repositories;

import com.example.matcher.models.Donor;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DonorRepository extends MongoRepository<Donor, Long>{
}