package com.example.matcher.controllers;

import com.example.matcher.exceptions.ResourceExistsException;
import com.example.matcher.exceptions.ResourceNotFoundException;
import com.example.matcher.models.*;
import com.example.matcher.repositories.HospitalRepository;
import com.example.matcher.repositories.OrganRepository;
import com.example.matcher.repositories.RecipientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/matcher/hospital")
public class HospitalController {
    @Autowired
    HospitalRepository hospitalRepository;
    @Autowired
    RecipientRepository recipientRepository;
    @Autowired
    OrganRepository organRepository;

    @PostMapping
    public void createHospital(@RequestBody Hospital hospital){
        if(hospitalRepository.existsById(hospital.getId())){
            throw new ResourceExistsException("Hospital exists");
        }
        hospitalRepository.save(hospital);
    }

    @GetMapping
    public List<Hospital> getAllHospitals(){
        return hospitalRepository.findAll();
    }

    @GetMapping("/{id}")
    public Hospital getHospitalById(@PathVariable String id){
        Optional<Hospital> hospital = hospitalRepository.findById(id);
        if(hospital.isEmpty()){
            throw new ResourceNotFoundException("Hospital not found");
        }
        return hospital.get();
    }

    @DeleteMapping("/{id}")
    public void deleteHospitalById(@PathVariable String id){
        hospitalRepository.deleteById(id);
    }

    @PutMapping("/{id}/notification")
    public void addNotificationToHospital(@PathVariable String id, @RequestBody Notifcation notifcation){
        Hospital hospital = getHospitalById(id);
        hospital.addNotifcation(notifcation);
        hospitalRepository.save(hospital);
    }

    @GetMapping("/{id}/recipients")
    public List<Recipient> getRecipientsById(@PathVariable String id){
        if(!hospitalRepository.existsById(id)){
            throw new ResourceNotFoundException("Hospital not found");
        }
        return recipientRepository.findRecipientByHospitalId(id);
    }

    @GetMapping("/{id}/organs")
    public List<Organ> getOrgansById(@PathVariable String id){
        if(!hospitalRepository.existsById(id)){
            throw new ResourceNotFoundException("Hospital not found");
        }
        return organRepository.findOrganByHospitalId(id);
    }

    @GetMapping("/{id}/notifications")
    public List<Notifcation> getNotificationsById(@PathVariable String id){
        Hospital hospital = getHospitalById(id);
        return hospital.getNotifications();
    }

    @GetMapping("/{id}/accept/recipient/{recipientId}/organ/{organId}")
    public void accept(
            @PathVariable String id,
            @PathVariable long recipientId,
            @PathVariable long organId
    ){
        Optional<Organ> organOptional = organRepository.findById(organId);
        if(organOptional.isEmpty()){
            throw new ResourceNotFoundException("Organ not found");
        }

        Optional<Recipient> recipientOptional = recipientRepository.findById(recipientId);
        if(recipientOptional.isEmpty()){
            throw new ResourceNotFoundException("Recipient not found");
        }

        Notifcation notifcation = new Notifcation(
                LocalDateTime.now(),
                String.format("Organ with id : %d has been matched to patient with id : %d in hospital with id : %s", organId, recipientId, id),
                false,
                recipientId,
                organId
        );

        Hospital hospital = hospitalRepository.findById(organOptional.get().getHospitalId()).get();
        hospital.addNotifcation(notifcation);
        hospitalRepository.save(hospital);

        Recipient recipient = recipientOptional.get();
        Organ organ = organOptional.get();

        recipient.setOrganNeeded(OrganNeeded.NAN);
        recipient.addOrgan(organId);

        organ.setOrganStatus(OrganStatus.TRANSIT);

        recipientRepository.save(recipient);
        organRepository.save(organ);
    }
}
