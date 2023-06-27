package com.ne.java.dtos;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.Date;

@Data
public class CreateProductDto {
    @NotBlank(message = "Code is required")

    private String code;

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Product type is required")
    private String productType;

    @Positive(message = "Price must be positive")
    private double price;
}