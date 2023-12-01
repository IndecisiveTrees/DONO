package com.example.matcher.controllers;

import com.example.matcher.exceptions.ResourceNotFoundException;
import com.example.matcher.models.*;
import com.example.matcher.repositories.*;
import com.example.matcher.requests.OrganCreationRequest;
import com.example.matcher.requests.OrganDetailsUpdateRequest;
import com.example.matcher.requests.OrganStatusUpdateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@CrossOrigin
@RequestMapping("/matcher/organ")
public class OrganController {
    @Autowired
    OrganRepository organRepository;
    @Autowired
    IdSequenceRepository idSequenceRepository;
    @Autowired
    HospitalRepository hospitalRepository;
    @Autowired
    RecipientRepository recipientRepository;
    @Autowired
    DonorRepository donorRepository;

    double giveDistance(Recipient recipient, double latOrgan, double longOrgan){
        Hospital hospital = hospitalRepository.findById(recipient.getHospitalId()).get();
        return org.apache.lucene.util.SloppyMath.haversinMeters(latOrgan, longOrgan, hospital.getLatitude(), hospital.getLongitude());
    }

    boolean matchBloodType(BloodGroup donor, BloodGroup recipient){
        return true;
    }

    static int f(int severity, int viability){
        return severity*severity*viability;
    }
    static class RecipientComparator implements Comparator<Recipient>{
        public int compare(Recipient a, Recipient b){
            return f(a.getSeverity(), a.getViability()) - f(b.getSeverity(), b.getViability());
        }
    }

    public Recipient match(Organ organ){
        ArrayList<Recipient> recipients = (ArrayList<Recipient>) recipientRepository.filterRecipientsByOrgan(organ.getOrganType().toString());

        Hospital hospital = hospitalRepository.findById(organ.getHospitalId()).get();
        Donor donor = donorRepository.findById(organ.getDonorId()).get();

        //filter
        recipients = new ArrayList<>(recipients
                .stream()
                .filter(recipient -> giveDistance(
                        recipient,
                        hospital.getLatitude(),
                        hospital.getLongitude()
                ) <= 10000)
                .filter(recipient -> matchBloodType(
                        donor.getBloodGroup(),
                        recipient.getBloodGroup()
                ))
                .filter(recipient -> !organ.getDeclinedIds().contains(recipient.getId()))
                .toList());

        //sort
        recipients.sort(new RecipientComparator());
        if(recipients.isEmpty()){
            throw new ResourceNotFoundException("No recipients found");
        }
        return recipients.get(0);
    }


    @PostMapping
    public long createOrgan(@RequestBody OrganCreationRequest req){
        System.out.println(req);
        IdSequence idSequence = idSequenceRepository.findById("organ").get();
        long nextId = idSequence.getIdvalue();
        idSequence.setIdvalue(nextId + 1);
        idSequenceRepository.save(idSequence);

        Organ organ = new Organ();
        organ.setId(nextId);
        if(!donorRepository.existsById(req.getDonorId())){
            throw new ResourceNotFoundException("Donor doesn't exist");
        }
        organ.setDonorId(req.getDonorId());
        if(!hospitalRepository.existsById(req.getHospitalId())){
            throw new ResourceNotFoundException("Hospital doesn't exist");
        }
        organ.setHospitalId(req.getHospitalId());
        organ.setOrganType(
                OrganType.valueOf(req.getOrganType())
        );
        organ.setOrganStatus(
                OrganStatus.valueOf(req.getOrganStatus())
        );
        organ.setDescription(req.getDescription());
        organ.setCreationTime(LocalDateTime.now());
        try{
            Recipient bestMatch = match(organ);
            Notifcation notifcation = new Notifcation(
                    LocalDateTime.now(),
                    String.format("A match has been found for patientId : %d.", bestMatch.getId()),
                    false,
                    bestMatch.getId(),
                    organ.getId()
            );
            Hospital hospital = hospitalRepository.findById(bestMatch.getHospitalId()).get();
            hospital.addNotifcation(notifcation);
            hospitalRepository.save(hospital);
        }catch(Exception e){}
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

    @GetMapping("/{id}/match")
    public Recipient getBestMatch(@PathVariable long id){
        Organ organ = getOrganById(id);
        return match(organ);
    }

    @DeleteMapping("/{id}")
    public void deleteOrganById(@PathVariable long id){
        organRepository.deleteById(id);
    }

    @PutMapping("/{id}/description")
    public void updateOrganDescription(@PathVariable long id, @RequestBody OrganDetailsUpdateRequest req){
        Organ organ =  getOrganById(id);
        organ.setDescription(req.getDescription());
        organRepository.save(organ);
    }

    @PutMapping("/{id}/status")
    public void updateOrganStatus(@PathVariable long id, @RequestBody OrganStatusUpdateRequest req){
        Organ organ =  getOrganById(id);
        organ.setOrganStatus(OrganStatus.valueOf(req.getStatus()));
        organRepository.save(organ);
    }

    @GetMapping("/{id}/decline/recipient/{recipientId}")
    public void declineOrgan(@PathVariable long id, @PathVariable long recipientId){
        Organ organ = getOrganById(id);
        organ.addDeclined(recipientId);

        Recipient bestMatch = match(organ);
        Notifcation notifcation = new Notifcation(
                LocalDateTime.now(),
                String.format("A match has been found for patientId : %d.", bestMatch.getId()),
                false,
                bestMatch.getId(),
                organ.getId()
        );
        Hospital hospital = hospitalRepository.findById(bestMatch.getHospitalId()).get();
        hospital.addNotifcation(notifcation);

        hospitalRepository.save(hospital);
        organRepository.save(organ);
    }
}
