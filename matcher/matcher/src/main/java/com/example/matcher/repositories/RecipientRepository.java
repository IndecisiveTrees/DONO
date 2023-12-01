package com.example.matcher.repositories;

import com.example.matcher.models.Recipient;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface RecipientRepository extends MongoRepository<Recipient, Long> {
    @Query("{hospitalId : '?0'}")
    List<Recipient> findRecipientByHospitalId(String id);

    @Query("{organNeeded : ?0}")
    List<Recipient> filterRecipientsByOrgan(String organ);
}
