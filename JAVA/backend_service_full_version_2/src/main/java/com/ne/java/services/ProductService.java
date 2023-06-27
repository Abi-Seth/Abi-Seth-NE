package com.ne.java.services;

import com.ne.java.dtos.CreateProductDto;
import com.ne.java.dtos.CreateQuantityDto;
import com.ne.java.dtos.ProductDto;
import com.ne.java.models.Product;
import com.ne.java.models.Quantity;
import com.ne.java.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product registerProduct(@Valid CreateProductDto product) {
        Product entity = new Product();
        entity.setName(product.getName());
        entity.setCode(product.getCode());
        entity.setProductType(product.getProductType());
        entity.setPrice(product.getPrice());
        return productRepository.save(entity);
    }

    public List<ProductDto> getAllProducts() {
        List<Product> products = productRepository.findAll();
        List<ProductDto> productDtos = new ArrayList<>();

        for (Product product : products) {
            ProductDto productDto = mapToProductDto(product);
            productDtos.add(productDto);
        }

        return productDtos;
    }

    public ProductDto getSingleProductById(Long productId) {
        Optional<Product> optionalProduct = productRepository.findById(productId);

        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            return mapToProductDto(product);
        }

        return null; // Or throw an exception if desired
    }

    private ProductDto mapToProductDto(Product product) {
        ProductDto productDto = new ProductDto();
        productDto.setId(product.getId());
        productDto.setCode(product.getCode());
        productDto.setName(product.getName());
        productDto.setProductType(product.getProductType());
        productDto.setPrice(product.getPrice());
        productDto.setInDate(product.getInDate());

        // Mapping quantities
        List<CreateQuantityDto> quantityDtos = new ArrayList<>();
        for (Quantity quantity : product.getQuantities()) {
            CreateQuantityDto quantityDto = new CreateQuantityDto();
//            quantityDto.setId(quantity.getId());
            quantityDto.setQuantity(quantity.getQuantity());
            quantityDto.setOperation(quantity.getOperation());
            quantityDtos.add(quantityDto);
        }
        productDto.setQuantities(quantityDtos);

        return productDto;
    }
}