package rw.ac.rca.ne.seth_abi.server.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import rw.ac.rca.ne.seth_abi.server.models.Quantity;
import rw.ac.rca.ne.seth_abi.server.services.IQuantityService;
import rw.ac.rca.ne.seth_abi.server.models.enums.EOperation;
import rw.ac.rca.ne.seth_abi.server.utils.ApiResponse;

import javax.validation.Valid;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/v1/api/quantity")
public class QuantityController {
    private final IQuantityService quantityService;

    public QuantityController(IQuantityService quantityService) {
        this.quantityService = quantityService;
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody Quantity quantity) throws IOException {
        LocalDateTime inDate = LocalDateTime.now();
        quantity.setDate(inDate);

        if (quantityService.isQuantityAvailable(quantity)) {
            int currentQuantity = quantityService.getQuantityByProductCode(quantity.getProductCode()); // Get the current quantity from the service/database

            if (quantity.getOperation() == EOperation.REMOVE) {
                quantity.setQuantity(currentQuantity - quantity.getQuantity());
            } else if (quantity.getOperation() == EOperation.ADD) {
                quantity.setQuantity(currentQuantity + quantity.getQuantity());
            } else {
                return ResponseEntity.badRequest().body(ApiResponse.badRequest("Invalid operation", "Operation not recognized"));
            }

            if (quantity.getQuantity() < 0) {
                return ResponseEntity.badRequest().body(ApiResponse.badRequest("Invalid operation", "Products are not enough!"));
            }
            quantityService.updateQuantity(quantity);
        } else {
            quantityService.create(quantity);
        }

        return ResponseEntity.ok(ApiResponse.success(true, "Quantity Synced Successfully", quantity));
    }
}
