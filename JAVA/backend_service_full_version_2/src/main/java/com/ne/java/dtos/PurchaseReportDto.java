package com.ne.java.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseReportDto {
    private Long id;
    private String customerName;
    private String date;
    private Long productId;
    private String productName;
    private int quantity;
    private double totalPrice;
    private double unitPrice;
}
