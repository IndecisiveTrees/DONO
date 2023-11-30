package com.example.matcher.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class Person {
    protected String name;
    protected LocalDateTime dob;
    protected String sex;
    protected String phoneNumber;
    protected String nextOfKin;
    protected String nextOfKinPhone;
    protected BloodGroup bloodGroup;
    protected MedicalRecord medicalRecord;
    protected long hospitalId;
    protected Boolean deceased;

    public Person(String name, LocalDateTime dob, String sex, String phoneNumber, String nextOfKin, String nextOfKinPhone, BloodGroup bloodGroup, MedicalRecord medicalRecord, long hospitalId, Boolean deceased) {
        super();
        this.name = name;
        this.dob = dob;
        this.sex = sex;
        this.phoneNumber = phoneNumber;
        this.nextOfKin = nextOfKin;
        this.nextOfKinPhone = nextOfKinPhone;
        this.bloodGroup = bloodGroup;
        this.medicalRecord = medicalRecord;
        this.hospitalId = hospitalId;
        this.deceased = deceased;
    }
}
