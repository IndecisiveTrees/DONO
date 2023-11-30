package com.example.matcher.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BloodGroup {
    private String antigen;
    private Boolean rh;
    @Override
    public String toString(){
        return String.format("%s%s", antigen, rh ? "+" : "-");
    }
}
