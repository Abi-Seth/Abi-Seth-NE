package rw.ac.rca.ne.seth_abi.server.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import rw.ac.rca.ne.seth_abi.server.models.TokenData;
import rw.ac.rca.ne.seth_abi.server.models.User;
import rw.ac.rca.ne.seth_abi.server.models.enums.ERole;
import rw.ac.rca.ne.seth_abi.server.services.IUserService;
import rw.ac.rca.ne.seth_abi.server.utils.ApiResponse;
import rw.ac.rca.ne.seth_abi.server.utils.Utility;
import rw.ac.rca.ne.seth_abi.server.utils.dtos.LoginDTO;
import rw.ac.rca.ne.seth_abi.server.utils.dtos.RegisterDTO;
import rw.ac.rca.ne.seth_abi.server.utils.security.JwtTokenProvider;

import javax.validation.Valid;

@RestController
@RequestMapping("/v1/api/user")
public class AuthController {

    private final IUserService userService;

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public AuthController(IUserService userService, AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDTO dto) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(dto.getLogin(), dto.getPassword()));

        String jwt = jwtTokenProvider.generateToken(authentication);
        TokenData tokenData = new TokenData(jwt);
        return ResponseEntity.ok().body(ApiResponse.success(true, "Logged in successfully", tokenData));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterDTO registerDTO) {
        User user = new ModelMapper().map(registerDTO, User.class);

        user.setPassword(Utility.encode(registerDTO.getPassword()));

        user.setRole(ERole.USER);

        return ResponseEntity.ok().body(ApiResponse.success(true, "Account Registered successfully!", userService.save(user)));
    }

    @GetMapping("/current")
    public ResponseEntity<?> profile() {
        User profile = userService.getLoggedInUser();

        return ResponseEntity.ok().body(ApiResponse.success(true, "Current user data", profile));
    }
}
