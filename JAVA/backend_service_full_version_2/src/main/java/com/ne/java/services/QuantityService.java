package com.ne.java.services;

import com.ne.java.dtos.CreateQuantityDto;
import com.ne.java.models.Product;
import com.ne.java.models.Quantity;
import com.ne.java.repositories.ProductRepository;
import com.ne.java.repositories.QuantityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuantityService {
    private final QuantityRepository quantityRepository;
    private final ProductRepository productRepository;

    @Autowired
    public QuantityService(QuantityRepository quantityRepository, ProductRepository productRepository) {
        this.quantityRepository = quantityRepository;
        this.productRepository = productRepository;
    }

    public Quantity registerQuantity(CreateQuantityDto quantityDto) {
        // Retrieve the product by productId
        Product product = productRepository.findById(quantityDto.getProductId())
                .orElseThrow(() -> new IllegalArgumentException("Product not found with ID: " + quantityDto.getProductId()));

        // Check if the product already has a quantity entry in the Quantity table
        Quantity existingQuantity = quantityRepository.findByProduct(product);

        // If an existing quantity is found, update it with the incoming quantity
        if (existingQuantity != null) {
            int newQuantity = existingQuantity.getQuantity() + quantityDto.getQuantity();
            existingQuantity.setQuantity(newQuantity);
            return quantityRepository.save(existingQuantity);
        }

        // If no existing quantity is found, create a new entry
        Quantity quantity = new Quantity();
        quantity.setProduct(product);
        quantity.setQuantity(quantityDto.getQuantity());
        quantity.setOperation(quantityDto.getOperation());
        return quantityRepository.save(quantity);
    }
}
