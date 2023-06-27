package rw.ac.rca.ne.seth_abi.server.utils.dtos;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

@Data
public class CreateProductDTO {
    @NotEmpty(message = "Name is required")
    private String name;

    @NotEmpty(message = "Product type is required")
    private String product_type;

    @Positive(message = "Price must be a positive value")
    private int price;

    @NotEmpty(message = "Image URL is required")
    private String image;

}
