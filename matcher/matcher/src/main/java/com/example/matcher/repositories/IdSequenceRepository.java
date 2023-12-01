package com.example.matcher.repositories;

import com.example.matcher.models.IdSequence;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface IdSequenceRepository extends MongoRepository<IdSequence, String> {
}
