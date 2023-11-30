package com.example.matcher.requests;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TestCreationRequest {
    private String name;
    private double fullScore;
    private long courseId;
}
