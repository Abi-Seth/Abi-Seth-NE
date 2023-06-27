package rw.ac.rca.ne.seth_abi.server.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import rw.ac.rca.ne.seth_abi.server.models.Product;
import rw.ac.rca.ne.seth_abi.server.services.IProductService;
import rw.ac.rca.ne.seth_abi.server.utils.ApiResponse;
import rw.ac.rca.ne.seth_abi.server.utils.dtos.CreateProductDTO;

import javax.validation.Valid;
import java.io.IOException;
import java.text.ParseException;
import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@RequestMapping("/v1/api/product")
public class ProductController {

    private final IProductService productService;


    public ProductController(IProductService productService) {
        this.productService = productService;
    }

    @GetMapping("")
    public ResponseEntity<?> all() {
        return ResponseEntity.ok(ApiResponse.success(true, "All the products", productService.all()));
    }

    @GetMapping("/{productId}")
    public ResponseEntity<?> byId(@PathVariable UUID productId) {
        return ResponseEntity.ok(ApiResponse.success(true, "Product details", productService.findById(productId)));
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody Product product) {
        try{
            LocalDateTime inDate = LocalDateTime.now();

            product.setInDate(inDate);
            return ResponseEntity.ok(ApiResponse.success(true, "Created Product Successfully", productService.create(product)));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
