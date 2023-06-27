package rw.ac.rca.ne.seth_abi.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import rw.ac.rca.ne.seth_abi.server.models.User;

import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmailOrPhone(String email, String username);

    Optional<User> findByEmail(String email);

    boolean existsByEmailOrPhone(String email, String phone);
}
