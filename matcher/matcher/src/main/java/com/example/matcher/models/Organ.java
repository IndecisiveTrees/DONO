package com.example.matcher.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Getter
@Setter
@NoArgsConstructor
@Document("_organs")
public class Organ {
    @Id
    private long id;
    private long donorId;
    private String hospitalId;
    private OrganType organType;
    private LocalDateTime creationTime;
    private OrganStatus organStatus;
    private String description;
    private ArrayList<Long> declinedIds;

    public Organ(long donorId, String hospitalId, OrganType organType, LocalDateTime creationTime, OrganStatus organStatus, String description, ArrayList<Long> declinedIds) {
        super();
        this.donorId = donorId;
        this.hospitalId = hospitalId;
        this.organType = organType;
        this.creationTime = creationTime;
        this.organStatus = organStatus;
        this.description = description;
        this.declinedIds = declinedIds;
    }
}
