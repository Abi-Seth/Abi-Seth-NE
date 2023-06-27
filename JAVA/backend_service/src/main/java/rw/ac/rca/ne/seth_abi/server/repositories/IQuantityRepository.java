package rw.ac.rca.ne.seth_abi.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rw.ac.rca.ne.seth_abi.server.models.Quantity;

import java.util.Optional;

@Repository
public interface  IQuantityRepository extends JpaRepository<Quantity, Long> {
    Optional<Quantity> findByProductCode(String product_code);
}
