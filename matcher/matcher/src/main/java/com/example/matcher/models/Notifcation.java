package com.example.matcher.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@Document("_notifications")
public class Notifcation {

    private LocalDate time;
    private String message;
    private Boolean read;

    public Notifcation(LocalDate time, String message, Boolean read) {
        super();
        this.time = time;
        this.message = message;
        this.read = read;
    }
}
