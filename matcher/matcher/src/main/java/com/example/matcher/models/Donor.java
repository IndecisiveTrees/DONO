package com.example.matcher.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Document("_donors")
public class Donor extends Person{
    @Id
    private long id;

    public Donor(long id, String name, LocalDate dob, String sex, String phoneNumber, String nextOfKin, String nextOfKinPhone, BloodGroup bloodGroup, MedicalRecord medicalRecord, String hospitalId, Boolean deceased) {
        super(name, dob, sex, phoneNumber, nextOfKin, nextOfKinPhone, bloodGroup, medicalRecord, hospitalId, deceased);
        this.id = id;
    }
}
