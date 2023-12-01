package com.example.matcher.requests;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrganCreationRequest {
    private long donorId;
    private String hospitalId;
    private String organType;
    private String organStatus;
    private String description;
}
