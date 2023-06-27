package com.ne.java.controllers;

import com.ne.java.models.Cart;
import com.ne.java.services.CartService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/cart")
public class CartController {
    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/add/{productId}/{quantity}")
    public void addItemToCart(@PathVariable Long productId, @PathVariable int quantity) {
        cartService.addItemToCart(productId, quantity);
    }

    @GetMapping
    public Cart getCart() {
        return cartService.getCart();
    }
    @PostMapping("/checkout")
    public void checkout() {
        cartService.checkout();
    }
}
