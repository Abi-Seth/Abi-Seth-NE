package com.ne.java.controllers;

import com.ne.java.dtos.CreateQuantityDto;
import com.ne.java.models.Quantity;
import com.ne.java.payload.ApiResponse;
import com.ne.java.services.QuantityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/quantities")
public class QuantityController {
    private final QuantityService quantityService;

    @Autowired
    public QuantityController(QuantityService quantityService) {
        this.quantityService = quantityService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse> registerQuantity(@RequestBody CreateQuantityDto quantityDto) {
        Quantity quantity = quantityService.registerQuantity(quantityDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse(true, "Quantity registered successfully", quantity));
    }
}
