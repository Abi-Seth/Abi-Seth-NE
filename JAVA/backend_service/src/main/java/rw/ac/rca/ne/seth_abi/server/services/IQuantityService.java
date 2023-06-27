package rw.ac.rca.ne.seth_abi.server.services;

import rw.ac.rca.ne.seth_abi.server.models.*;

import javax.validation.Valid;
import java.io.IOException;
import java.util.Optional;

public interface IQuantityService {
    Quantity create(@Valid Quantity quantity) throws IOException;
    int getQuantityByProductCode(String product_code);
    void updateQuantity(Quantity updatedQuantity);
    boolean isQuantityAvailable(Quantity quantity);
}
