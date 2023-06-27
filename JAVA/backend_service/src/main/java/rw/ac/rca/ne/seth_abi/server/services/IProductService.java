package rw.ac.rca.ne.seth_abi.server.services;

import rw.ac.rca.ne.seth_abi.server.models.Product;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

public interface IProductService {
    List<Product> all();

    Product create(@Valid Product product) throws IOException;

    Object findById(UUID productId);
}
