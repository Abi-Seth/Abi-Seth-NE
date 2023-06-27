package com.ne.java.repositories;

import com.ne.java.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface IUserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String email);
    //findById
    Optional<User> findById(UUID id);

    Optional<User> findByEmailOrPhoneNumber(String email, String phoneNumber);


}
