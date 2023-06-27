package com.ne.java.controllers;

import com.ne.java.dtos.CreateProductDto;
import com.ne.java.dtos.ProductDto;
import com.ne.java.models.Product;
import com.ne.java.payload.ApiResponse;
import com.ne.java.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {
    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse> registerProduct(@Valid  @RequestBody CreateProductDto product) {
        Product entity = productService.registerProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse(true, "Product registered successfully", entity));
    }
    @GetMapping("/all")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<ProductDto> products = productService.getAllProducts();
        return new ResponseEntity(products, HttpStatus.OK);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<Product> getProductById(@PathVariable Long productId) {
        ProductDto product = productService.getSingleProductById(productId);
        return new ResponseEntity(product, HttpStatus.OK);
    }
}
