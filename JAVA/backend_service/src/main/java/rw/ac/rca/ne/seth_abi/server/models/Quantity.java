package rw.ac.rca.ne.seth_abi.server.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import rw.ac.rca.ne.seth_abi.server.models.enums.EOperation;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "quantity")
public class Quantity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    private String productCode;

    private int quantity;

    @Enumerated(EnumType.STRING)
    private EOperation operation = EOperation.ADD;

    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private LocalDateTime date;

}
