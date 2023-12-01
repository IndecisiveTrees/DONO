package com.example.matcher.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;


@Getter
@Setter
@NoArgsConstructor
@Document("_recipients")
@ToString
public class Recipient extends Person{
    @Id
    private long id = 0;
    private OrganNeeded organNeeded;
    private int severity;
    private int viability;
    private ArrayList<Long> receivedOrganIds = new ArrayList<Long>();

    public Recipient(long id, String name, LocalDate dob, String sex, String phoneNumber, String nextOfKin, String nextOfKinPhone, BloodGroup bloodGroup, MedicalRecord medicalRecord, String hospitalId, Boolean deceased, OrganNeeded organNeeded, int severity, int viability, ArrayList<Long> receivedOrganIds) {
        super(name, dob, sex, phoneNumber, nextOfKin, nextOfKinPhone, bloodGroup, medicalRecord, hospitalId, deceased);
        this.id = id;
        this.organNeeded = organNeeded;
        this.severity = severity;
        this.viability = viability;
        this.receivedOrganIds = receivedOrganIds;
    }

    public void addOrgan(long organId){
        this.receivedOrganIds.add(organId);
    }
}
