package rw.ac.rca.ne.seth_abi.server.services.impl;

import org.springframework.stereotype.Service;
import rw.ac.rca.ne.seth_abi.server.models.Product;
import rw.ac.rca.ne.seth_abi.server.repositories.IProductRepository;
import rw.ac.rca.ne.seth_abi.server.services.IProductService;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@Service
public class ProductServiceImpl implements IProductService {

    private final IProductRepository productRepository;


    public ProductServiceImpl(IProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<Product> all() {
        return productRepository.findAll();
    }


    @Override
    public Product create(@Valid Product product) {
        return productRepository.save(product);
    }

    @Override
    public Object findById(UUID productId) {
        return productRepository.findById(productId);
    }
}
