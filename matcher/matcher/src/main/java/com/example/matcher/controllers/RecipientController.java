package com.example.matcher.controllers;

import com.example.matcher.exceptions.ResourceNotFoundException;
import com.example.matcher.models.*;
import com.example.matcher.repositories.IdSequenceRepository;
import com.example.matcher.repositories.RecipientRepository;
import com.example.matcher.requests.RecipientCreationRequest;
import com.example.matcher.requests.RecipientDetailsUpdateRequest;
import com.example.matcher.requests.RecipientOrganUpdateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/matcher/recipient")
public class RecipientController {
    @Autowired
    RecipientRepository recipientRepository;

    @Autowired
    IdSequenceRepository idSequenceRepository;

    @PostMapping
    public long createRecipient(@RequestBody RecipientCreationRequest req){
        IdSequence idSequence = idSequenceRepository.findById("recipient").get();
        long nextId = idSequence.getIdvalue();
        idSequence.setIdvalue(nextId + 1);
        idSequenceRepository.save(idSequence);

        Recipient recipient = new Recipient();
        recipient.setId(nextId);
        recipient.setName(req.getName());
        recipient.setDob(LocalDate.parse(req.getDob()));
        recipient.setSex(req.getSex());
        recipient.setPhoneNumber(req.getPhoneNumber());
        recipient.setNextOfKin(req.getNextOfKin());
        recipient.setNextOfKinPhone(req.getNextOfKinPhone());
        recipient.setBloodGroup(
                new BloodGroup(
                        req.getAntigen(),
                        req.getRh()
                )
        );
        recipient.setMedicalRecord(
                new MedicalRecord(
                        Diabetes.valueOf(req.getDiabetes()),
                        req.getHypertensive(),
                        req.getDescription()
                )
        );
        recipient.setHospitalId(req.getHospitalId());
        recipient.setDeceased(req.getDeceased());
        recipient.setOrganNeeded(
                OrganNeeded.valueOf(req.getOrganNeeded())
        );
        recipient.setSeverity(req.getSeverity());
        recipient.setViability(req.getViability());

        System.out.println(recipient);

        recipientRepository.save(recipient);
        return nextId;
    }

    @GetMapping("/{id}")
    public Recipient getRecipientById(@PathVariable long id){
        Optional<Recipient> recipient = recipientRepository.findById(id);
        if(recipient.isEmpty()){
            throw new ResourceNotFoundException("Recipient not found");
        }
        return recipient.get();
    }

    @DeleteMapping("/{id}")
    public void deleteRecipientById(@PathVariable long id){
        recipientRepository.deleteById(id);
    }

    @PutMapping("/{id}/details")
    public void updateRecipientDetails(@PathVariable long id, @RequestBody RecipientDetailsUpdateRequest req){
        Recipient recipient = getRecipientById(id);
        recipient.setViability(req.getViability());
        recipient.setSeverity(req.getSeverity());

        MedicalRecord medred = recipient.getMedicalRecord();
        medred.setDescription(req.getDescription());
        recipient.setMedicalRecord(medred);

        recipientRepository.save(recipient);
    }

    @PutMapping("/{id}/status")
    public void updateRecipientStatus(@PathVariable long id, @RequestBody RecipientOrganUpdateRequest req){
        Recipient recipient = getRecipientById(id);
        recipient.setOrganNeeded(OrganNeeded.valueOf(req.getStatus()));
        recipientRepository.save(recipient);
    }
}
