package com.example.matcher.controllers;

import com.example.matcher.exceptions.ResourceNotFoundException;
import com.example.matcher.models.*;
import com.example.matcher.repositories.DonorRepository;
import com.example.matcher.repositories.IdSequenceRepository;
import com.example.matcher.requests.DonorCreationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/matcher/donor")
public class DonorController {
    @Autowired
    DonorRepository donorRepository;
    @Autowired
    IdSequenceRepository idSequenceRepository;
    @PostMapping
    public long createDonor(@RequestBody DonorCreationRequest req){
        IdSequence idSequence = idSequenceRepository.findById("donor").get();
        long nextId = idSequence.getIdvalue();
        idSequence.setIdvalue(nextId + 1);
        idSequenceRepository.save(idSequence);

        Donor donor = new Donor();
        donor.setId(nextId);
        donor.setName(req.getName());
        donor.setDob(LocalDate.parse(req.getDob()));
        donor.setSex(req.getSex());
        donor.setPhoneNumber(req.getPhoneNumber());
        donor.setNextOfKin(req.getNextOfKin());
        donor.setNextOfKinPhone(req.getNextOfKinPhone());
        donor.setBloodGroup(
                new BloodGroup(
                        req.getAntigen(),
                        req.getRh()
                )
        );
        donor.setMedicalRecord(
                new MedicalRecord(
                        Diabetes.valueOf(req.getDiabetes()),
                        req.getHypertensive(),
                        req.getDescription()
                )
        );
        donor.setHospitalId(req.getHospitalId());
        donor.setDeceased(req.getDeceased());
        donorRepository.save(donor);

        return nextId;
    }

    @GetMapping("/{id}")
    public Donor getDonorById(@PathVariable long id){
        Optional<Donor> donor = donorRepository.findById(id);
        if(donor.isEmpty()){
            throw new ResourceNotFoundException("Donor not found");
        }
        return donor.get();
    }

    @DeleteMapping("/{id}")
    public void deleteDonorById(@PathVariable long id){
        donorRepository.deleteById(id);
    }

}
