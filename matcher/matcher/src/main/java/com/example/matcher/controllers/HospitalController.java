package com.example.matcher.controllers;

import com.example.matcher.exceptions.ResourceNotFoundException;
import com.example.matcher.models.Hospital;
import com.example.matcher.repositories.HospitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/matcher/hospital")
public class HospitalController {
    @Autowired
    HospitalRepository hospitalRepository;

    @PostMapping
    public Hospital createHospital(@RequestBody Hospital hospital){
        hospitalRepository.save(hospital);

        Optional<Hospital> savedHospital = hospitalRepository.findById(hospital.getId());
        if(savedHospital.isEmpty()){
            throw new ResourceNotFoundException("Hospital not found");
        }
        return savedHospital.get();
    }

    @GetMapping
    public List<Hospital> getAllHospitals(){
        return hospitalRepository.findAll();
    }
}
