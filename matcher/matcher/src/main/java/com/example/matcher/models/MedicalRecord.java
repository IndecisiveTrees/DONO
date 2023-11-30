package com.example.matcher.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

enum Diabetes{
    NAN,
    TYPE1,
    TYPE2,
    TYPE3
}


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MedicalRecord {
    private Diabetes diabetes;
    private Boolean hypertense;
    private String description;
}
