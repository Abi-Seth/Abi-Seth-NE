package com.ne.java.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String code;

    private String name;

    @Column(name = "product_type")
    private String productType;

    private double price;

    @Temporal(TemporalType.DATE)
    @Column(name = "in_date")
    private Date inDate;
    @JsonIgnore
    @OneToMany(mappedBy = "product")
    private List<Purchase> purchases;
    @JsonIgnore
    @OneToMany(mappedBy = "product")
    private List<Quantity> quantities;
    @PrePersist
    private void setDefaultInDate() {
        if (inDate == null) {
            inDate = new Date(); // Set the default value to the current date
        }
    }
}
