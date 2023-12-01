package com.example.matcher.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.ArrayList;

@Getter
@Setter
@NoArgsConstructor
@Document("_hospitals")
public class Hospital {
    @Id
    private String id;
    private String name;
    private double latitude;
    private double longitude;
    private ArrayList<Notifcation> notifications;

    public Hospital(String id, String name, double latitude, double longitude){
        super();
        this.id = id;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.notifications = new ArrayList<Notifcation>();
    }
    public void addNotifcation(Notifcation notification){
        notifications.add(notification);
    }
}