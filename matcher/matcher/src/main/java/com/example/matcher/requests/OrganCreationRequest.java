package com.example.matcher.requests;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class OrganCreationRequest {
    private long donorId;
    private String hospitalId;
    private String organType;
    private String organStatus;
    private String description;
}
