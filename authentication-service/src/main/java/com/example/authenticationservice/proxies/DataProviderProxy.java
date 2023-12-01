package com.example.authenticationservice.proxies;

import com.example.authenticationservice.models.RegisterRequest;
import com.example.authenticationservice.models.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name="matcher")
public interface DataProviderProxy {
    @PostMapping("/matcher/hospital/user")
    public User createUser(@RequestBody RegisterRequest req);
}

