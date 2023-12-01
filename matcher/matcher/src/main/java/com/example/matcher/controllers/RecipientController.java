package com.example.matcher.controllers;

import com.example.matcher.exceptions.ResourceExists;
import com.example.matcher.models.IdSequence;
import com.example.matcher.models.Recipient;
import com.example.matcher.repositories.IdSequenceRepository;
import com.example.matcher.repositories.RecipientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/matcher/recipient")
public class RecipientController {
    @Autowired
    RecipientRepository recipientRepository;
    @Autowired
    IdSequenceRepository idSequenceRepository;
    @PostMapping
    public long createRecipient(@RequestBody Recipient recipient){
        if(recipient.getId() == 0 || recipientRepository.existsById(recipient.getId())){
            throw new ResourceExists("Recipient exists");
        }

        IdSequence idSequence = idSequenceRepository.findById("recipient").get();
        long nextId = idSequence.getIdvalue();
        idSequence.setIdvalue(nextId + 1);
        idSequenceRepository.save(idSequence);

        recipient.setId(nextId);
        recipientRepository.save(recipient);
        return nextId;
    }
}
