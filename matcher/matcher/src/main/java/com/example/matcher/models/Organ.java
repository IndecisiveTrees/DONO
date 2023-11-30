package com.example.matcher.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

enum OrganType{
    HEART,
    LIVER,
    KIDNEY,
    LUNG
}

enum OrganStatus{
    BODY,
    TRANSIT,
    TRANSPLANTED
}

@Getter
@Setter
@NoArgsConstructor
@Document("_organs")
public class Organ {
    @Id
    private long id;
    private long donorId;
    private OrganType organType;
    private LocalDate creationTime;
    private OrganStatus organStatus;
    private String description;

    public Organ(long donorId, OrganType organType, LocalDate creationTime, OrganStatus organStatus, String description) {
        super();
        this.donorId = donorId;
        this.organType = organType;
        this.creationTime = creationTime;
        this.organStatus = organStatus;
        this.description = description;
    }
}
