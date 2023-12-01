package com.example.matcher.requests;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DonorCreationRequest {
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
}
