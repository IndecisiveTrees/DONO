package com.example.matcher.repositories;

import com.example.matcher.models.Organ;
import com.example.matcher.models.Recipient;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface OrganRepository extends MongoRepository<Organ, Long> {
    @Query("{hospitalId : '?0'}")
    List<Organ> findOrganByHospitalId(String id);
}
