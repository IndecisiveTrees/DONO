package com.example.matcher.repositories;

import com.example.matcher.models.Hospital;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface HospitalRepository extends MongoRepository<Hospital, String> {
    @Query("{name:'?0'")
    Hospital findHospitalByName(String name);
}
