package com.example.matcher.controllers;

import com.example.matcher.models.BloodGroup;
import com.example.matcher.models.Donor;
import com.example.matcher.models.Hospital;
import com.example.matcher.models.MedicalRecord;
import com.example.matcher.requests.DonorCreationRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.Test;
import org.junit.runner.RunWith;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.AutoConfigureDataMongo;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDate;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class HospitalControllerTest {


    @Autowired
    private MockMvc mvc;

    @Autowired
    MongoTemplate mongoTemplate;

    private Hospital hospital;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    public  void init() {
        this.hospital = new Hospital("111A", "Ha Ho", 12.11,11.15);

    }

    @Test
    public void createHospitalTest() throws  Exception {
        System.out.println("HI");
        DonorCreationRequest dreq = new DonorCreationRequest();
        dreq.setName("Harsh");
        ResultActions response = mvc.perform(post("/matcher/hospital")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(hospital)));


        response.andDo(MockMvcResultHandlers.print());;


    }

    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    public void getAllHospital() throws Exception {
        this.mvc.perform(get("/matcher/hospital")).andDo(print());
    }

    @Test
    public void getRecipientTest() throws Exception {
        this.mvc.perform(get("/matcher/hospital/6/recipients")).andDo(print());
    }

    @Test
    public void getNotificationTest() throws Exception {
        this.mvc.perform(get("/matcher/hospital/6/notifications")).andDo(print());
    }

}