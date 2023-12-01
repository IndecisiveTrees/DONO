package com.example.matcher.requests;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RecipientDetailsUpdateRequest {
    private int viability;
    private int severity;
    private String description;
}
