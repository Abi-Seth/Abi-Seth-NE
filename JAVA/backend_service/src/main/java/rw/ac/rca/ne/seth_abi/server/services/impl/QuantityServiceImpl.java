package rw.ac.rca.ne.seth_abi.server.services.impl;

import org.springframework.stereotype.Service;
import rw.ac.rca.ne.seth_abi.server.models.Quantity;
import rw.ac.rca.ne.seth_abi.server.repositories.IProductRepository;
import rw.ac.rca.ne.seth_abi.server.repositories.IQuantityRepository;
import rw.ac.rca.ne.seth_abi.server.services.IQuantityService;

import javax.validation.Valid;
import java.util.Optional;
import java.util.UUID;

@Service
public class QuantityServiceImpl implements IQuantityService {

    private final IQuantityRepository quantityRepository;
    private final IProductRepository productRepository;

    public QuantityServiceImpl(IQuantityRepository quantityRepository, IProductRepository productRepository) {
        this.quantityRepository = quantityRepository;
        this.productRepository = productRepository;
    }

    @Override
    public Quantity create(@Valid Quantity quantity) {
        if (!productRepository.existsById(UUID.fromString(quantity.getProductCode()))){
            throw new RuntimeException("Product does not exit");
        }
        return quantityRepository.save(quantity);
    }

    @Override
    public int getQuantityByProductCode(String product_code) {
        Optional<Quantity> data = quantityRepository.findByProductCode(product_code);
        boolean isPresent = data.isPresent();
        int quantity = 0;
        if (isPresent)
            quantity = data.get().getQuantity();
        return quantity;
    }

    @Override
    public void updateQuantity(Quantity updatedQuantity) {
        quantityRepository.findByProductCode(updatedQuantity.getProductCode())
                .ifPresent(quantity -> {
                    quantity.setQuantity(updatedQuantity.getQuantity());
                    quantityRepository.save(quantity);
                });
    }

    @Override
    public boolean isQuantityAvailable(Quantity updatedQuantity) {
        return quantityRepository.findByProductCode(updatedQuantity.getProductCode()).isPresent();
    }

}
