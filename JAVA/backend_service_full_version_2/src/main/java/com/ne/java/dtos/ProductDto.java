package com.ne.java.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
public class ProductDto {
    private Long id;
    private String code;
    private String name;
    private String productType;
    private double price;
    private Date inDate;
    private List<CreateQuantityDto> quantities;
}

