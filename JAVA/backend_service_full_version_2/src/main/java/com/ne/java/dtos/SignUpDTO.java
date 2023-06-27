package com.ne.java.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.ne.java.security.ValidPassword;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignUpDTO {
//sign up dto
    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String firstName;

    @NotBlank
    @Pattern(regexp = "[0-9]{10}", message = "Your phone is not a valid phone number")
    private String phoneNumber;
    @ValidPassword
    @NotBlank
    private String password;
    //confirmPassword
    @NotBlank
    private String confirmPassword;

}