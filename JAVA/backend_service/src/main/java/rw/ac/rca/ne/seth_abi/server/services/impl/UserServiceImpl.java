package rw.ac.rca.ne.seth_abi.server.services.impl;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import rw.ac.rca.ne.seth_abi.server.models.User;
import rw.ac.rca.ne.seth_abi.server.repositories.IUserRepository;
import rw.ac.rca.ne.seth_abi.server.services.IUserService;

import java.util.List;

@Service
public class UserServiceImpl implements IUserService {

    private final IUserRepository userRepository;

    public UserServiceImpl(IUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User save(User user) {
        if (userRepository.existsByEmailOrPhone(user.getEmail(), user.getPhone())){
            throw new RuntimeException("User already registered");
        }

        return userRepository.save(user);
    }

    @Override
    public User getLoggedInUser() {
        if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() == "anonymousUser")
            throw new RuntimeException("You are not logged in, try to log in");

        String email;
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetails) {
            email = ((UserDetails) principal).getUsername();
        } else {
            email = principal.toString();
        }

        return userRepository.findByEmailOrPhone(email, email).orElseThrow(
                () -> new RuntimeException("User not found with email"));
    }
}
