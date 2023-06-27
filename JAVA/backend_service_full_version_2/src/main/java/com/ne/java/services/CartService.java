package com.ne.java.services;

import com.ne.java.models.*;
import com.ne.java.repositories.ProductRepository;
import com.ne.java.repositories.PurchaseRepository;
import com.ne.java.repositories.QuantityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CartService {
    private final Map<Long, CartItem> cartItems = new HashMap<>();
    private final PurchaseRepository purchaseRepository;
    private IUserService userService;
    @Autowired
    public CartService(PurchaseRepository purchaseRepository, IUserService userService, ProductRepository productRepository) {
        this.purchaseRepository = purchaseRepository;
        this.userService = userService;
        this.productRepository = productRepository;
    }
//product repository
    private final ProductRepository productRepository;
    public CartService(PurchaseRepository purchaseRepository, ProductRepository productRepository) {
        this.purchaseRepository = purchaseRepository;
        this.productRepository = productRepository;
    }
    @Autowired
    private QuantityRepository quantityRepository;
    public void addItemToCart(Long productId, int quantity) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found with ID: " + productId));
        // Retrieve the Quantity object for the specified productId
        Quantity quantityObject = quantityRepository.findByProductId(productId);
        if(quantityObject != null) {
            int availableQuantity = quantityObject.getQuantity();
            if (availableQuantity < quantity) {
                throw new IllegalArgumentException("Not enough quantity available");
            }
        }
        // Check if the item is already in the cart
        if (cartItems.containsKey(productId)) {
            CartItem existingItem = cartItems.get(productId);
            existingItem.setQuantity(existingItem.getQuantity() + quantity);
            existingItem.setTotalPrice(existingItem.getQuantity() * product.getPrice());
        } else {
            CartItem newItem = new CartItem(productId, quantity, quantity * product.getPrice());
            cartItems.put(productId, newItem);
        }
    }

    public Cart getCart() {
        List<CartItem> cartItemList = new ArrayList<>(cartItems.values());
        Cart cart = new Cart();
        cart.setItems(cartItemList);
        return cart;
    }
    public void checkout() {
        List<Purchase> purchases = new ArrayList<>();

        for (CartItem cartItem : cartItems.values()) {
            Product product = productRepository.findById(cartItem.getProductId())
                    .orElseThrow(() -> new IllegalArgumentException("Product not found with ID: " + cartItem.getProductId()));

            // Update the product quantity
            Quantity quantity = quantityRepository.findByProductId(cartItem.getProductId());
            if (quantity != null) {
                int availableQuantity = quantity.getQuantity();
                int requestedQuantity = cartItem.getQuantity();

                if (requestedQuantity <= availableQuantity) {
                    // Reduce the available quantity by the requested quantity
                    quantity.setQuantity(availableQuantity - requestedQuantity);

                    // Save the updated quantity to the database
                    quantityRepository.save(quantity);
                } else {
                    throw new IllegalArgumentException("Insufficient quantity for product with ID: " + cartItem.getProductId());
                }
            } else {
                throw new IllegalArgumentException("Quantity not found for product with ID: " + cartItem.getProductId());
            }

            // Create the Purchase object
            Purchase purchased = new Purchase();
            purchased.setQuantity(cartItem.getQuantity());
            purchased.setTotal(cartItem.getTotalPrice());
            purchased.setProduct(product);
            purchased.setCustomerId(userService.getLoggedInUser());
            purchased.setDate(new Date());

            purchases.add(purchased);
        }

        purchaseRepository.saveAll(purchases);

        cartItems.clear();
    }
}

