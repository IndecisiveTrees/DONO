package com.example.matcher.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_ACCEPTABLE)
public class ResourceExistsException extends RuntimeException{
    public ResourceExistsException(String format){
        super(format);
    }
}
