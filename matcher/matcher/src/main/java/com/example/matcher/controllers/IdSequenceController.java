package com.example.matcher.controllers;

import com.example.matcher.exceptions.ResourceNotFoundException;
import com.example.matcher.models.IdSequence;
import com.example.matcher.repositories.IdSequenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/matcher/idsequence")
public class IdSequenceController {
    @Autowired
    IdSequenceRepository idSequenceRepository;

    @PostMapping
    public void createIdSequence(@RequestBody IdSequence idSequence){
        idSequenceRepository.save(idSequence);
    }

    @GetMapping("/{sequence}")
    public long getNextId(@PathVariable String sequence){
        Optional<IdSequence> idSequence = idSequenceRepository.findById(sequence);
        if(idSequence.isEmpty()){
            throw new ResourceNotFoundException("No id sequence with the same name");
        }
        return idSequence.get().getIdvalue();
    }

}
