package com.example.matcher.requests;

import com.example.matcher.models.BloodGroup;
import com.example.matcher.models.MedicalRecord;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RecipientCreationRequest {
    private String name;
    private String dob;
    private String sex;
    private String phoneNumber;
    private String nextOfKin;
    private String nextOfKinPhone;
    private String antigen;
    private Boolean rh;
    private String diabetes;
    private Boolean hypertensive;
    private String description;
    private String hospitalId;
    private Boolean deceased;
    private String organNeeded;
    private int severity;
    private int viability;
}
