package com.ne.java.services;

import com.ne.java.dtos.PurchaseReportDto;
import com.ne.java.models.Purchase;
import com.ne.java.repositories.PurchaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReportService {
    @Autowired
    private PurchaseRepository purchaseRepository;

    public List<PurchaseReportDto> generatePurchaseReport() {
        List<PurchaseReportDto> report = new ArrayList<>();
        List<Purchase> purchases = purchaseRepository.findAll();
        // Inside the report generation logic
        for (Purchase purchased : purchases) {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String formattedDate = dateFormat.format(purchased.getDate());
            PurchaseReportDto dto = new PurchaseReportDto();
            dto.setId(purchased.getId());
            dto.setCustomerName(purchased.getCustomerId().getFirstName());
            dto.setDate(formattedDate);
            dto.setProductId(purchased.getProduct().getId());
            dto.setProductName(purchased.getProduct().getName());
            dto.setQuantity(purchased.getQuantity());
            dto.setUnitPrice(purchased.getProduct().getPrice());
            dto.setTotalPrice(purchased.getProduct().getPrice() * purchased.getQuantity());

            report.add(dto);
        }

        return report;
    }


}

