package rw.ac.rca.ne.seth_abi.server.utils.dtos;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Data
public class RegisterDTO {

    @NotEmpty
    private String fullNames;

    @NotEmpty
    @Size(min = 10, max = 10, message = "Enter a valid Phone Number")
    private String phone;

    @NotEmpty
    @Email
    private String email;

    @NotEmpty
    private String password;
}
