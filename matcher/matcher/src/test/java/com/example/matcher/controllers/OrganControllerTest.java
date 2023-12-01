package com.example.matcher.controllers;

import com.example.matcher.models.*;
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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
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
public class OrganControllerTest {


    @Autowired
    private MockMvc mvc;

    @Autowired
    MongoTemplate mongoTemplate;

    private Organ organ;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    public  void init() {
        this.organ = new Organ(1001,null,null,null,null,null,null);

    }

    @Test
    public void createOrganTest() throws  Exception {
        System.out.println("HI");
        DonorCreationRequest dreq = new DonorCreationRequest();
        dreq.setName("Harsh");
        ResultActions response = mvc.perform(post("/matcher/organ")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(organ)));


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
    public void getorganbyidTest() throws Exception {
        this.mvc.perform(get("/matcher/organ/1001")).andDo(print());
    }

    @Test
    public void deleteorganbyIdTest() throws Exception {
        this.mvc.perform(delete("/matcher/organ/1001")).andDo(print());
    }



}