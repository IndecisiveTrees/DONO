package com.example.matcher.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

enum OrganNeeded{
    NAN,
    HEART,
    LIVER,
    KIDNEY,
    LUNG
}


@Getter
@Setter
@NoArgsConstructor
@Document("_recipients")
public class Recipient extends Person{
    @Id
    private long id;
    private OrganNeeded organNeeded;
    private int severity;
    private int viability;


    public Recipient(long id, String name, LocalDateTime dob, String sex, String phoneNumber, String nextOfKin, String nextOfKinPhone, BloodGroup bloodGroup, MedicalRecord medicalRecord, long hospitalId, Boolean deceased, OrganNeeded organNeeded, int severity, int viability) {
        super(name, dob, sex, phoneNumber, nextOfKin, nextOfKinPhone, bloodGroup, medicalRecord, hospitalId, deceased);
        this.id = id;
        this.organNeeded = organNeeded;
        this.severity = severity;
        this.viability = viability;
    }
}
