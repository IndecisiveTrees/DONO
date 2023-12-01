package com.example.matcher.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_ACCEPTABLE)
public class ResourceExists extends RuntimeException{
    public ResourceExists(String format){
        super(format);
    }
}
