package com.example.matcher.controllers;

import com.example.matcher.exceptions.ResourceNotFoundException;
import com.example.matcher.models.*;
import com.example.matcher.repositories.IdSequenceRepository;
import com.example.matcher.repositories.OrganRepository;
import com.example.matcher.requests.OrganCreationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/matcher/organ")
public class OrganController {
    @Autowired
    OrganRepository organRepository;
    @Autowired
    IdSequenceRepository idSequenceRepository;

    @PostMapping
    public long createOrgan(@RequestBody OrganCreationRequest req){
        IdSequence idSequence = idSequenceRepository.findById("organ").get();
        long nextId = idSequence.getIdvalue();
        idSequence.setIdvalue(nextId + 1);
        idSequenceRepository.save(idSequence);

        Organ organ = new Organ();
        organ.setId(nextId);
        organ.setDonorId(req.getDonorId());
        organ.setHospitalId(req.getHospitalId());
        organ.setOrganType(
                OrganType.valueOf(req.getOrganType())
        );
        organ.setOrganStatus(
                OrganStatus.valueOf(req.getOrganStatus())
        );
        organ.setDescription(req.getDescription());
        organ.setCreationTime(LocalDateTime.now());

        organRepository.save(organ);
        return nextId;
    }
    @GetMapping("/{id}")
    public Organ getOrganById(@PathVariable long id){
        Optional<Organ> organ = organRepository.findById(id);
        if(organ.isEmpty()){
            throw new ResourceNotFoundException("Organ not found");
        }
        return organ.get();
    }

    @DeleteMapping("/{id}")
    public void deleteOrganById(@PathVariable long id){
        organRepository.deleteById(id);
    }
}
