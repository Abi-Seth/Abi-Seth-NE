package com.ne.java.repositories;

import com.ne.java.models.Product;
import com.ne.java.models.Quantity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuantityRepository extends JpaRepository<Quantity, Long> {
    Quantity findByProductId(Long productId);

    Quantity findByProduct(Product product);
}
