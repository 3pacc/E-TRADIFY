package com.pfa.financePredict.controller;

import com.pfa.financePredict.model.*;
import com.pfa.financePredict.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.pfa.financePredict.dal.dal;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserService userService;

    private boolean isAdmin(User user) {
        return user != null && user.getRole() == Role.ADMINISTRATOR;
    }
    private static final String ADMIN_PASSWORD = "IamAdmin@";

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userService.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email is already taken!");
        }

        // Check the password to determine the user's role
        if (user.getPassword().equals(ADMIN_PASSWORD)) {
            user.setRole(Role.ADMINISTRATOR);
        } else {
            user.setRole(Role.TRADER);
        }

        userService.saveUser(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody User user) {
        dal dal = new dal();
        User foundUser = dal.getUserByEmail(user.getEmail());
        dal.closeConnection();

        if (foundUser != null) {
            if (foundUser.getPassword().equals(user.getPassword())) {
                // Check the user's role and return appropriate response
                if (foundUser.getRole() == Role.ADMINISTRATOR) {
                    return ResponseEntity.ok("Administrator authenticated successfully!");
                } else if (foundUser.getRole() == Role.TRADER) {
                    return ResponseEntity.ok("Trader authenticated successfully!");
                }
            } else {
                return ResponseEntity.badRequest().body("Invalid password!");
            }
        } else {
            return ResponseEntity.badRequest().body("User not found!");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id, @RequestHeader("Authorization") String token) {
        User currentUser = extractUserFromToken(token);
        if (isAdmin(currentUser)) {
            User user = userService.getUserById(id);
            if (user != null) {
                return ResponseEntity.ok(user);
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody User user, @RequestHeader("Authorization") String token) {
        User currentUser = extractUserFromToken(token);
        if (isAdmin(currentUser)) {
            User createdUser = userService.saveUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user, @RequestHeader("Authorization") String token) {
        User currentUser = extractUserFromToken(token);
        if (isAdmin(currentUser)) {
            user.setId(id);
            User updatedUser = userService.updateUser(user);
            if (updatedUser != null) {
                return ResponseEntity.ok(updatedUser);
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id, @RequestHeader("Authorization") String token) {
        User currentUser = extractUserFromToken(token);
        if (isAdmin(currentUser)) {
            userService.deleteUser(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @GetMapping("/users/role/{role}")
    public ResponseEntity<List<User>> getUsersByRole(@PathVariable String role, @RequestHeader("Authorization") String token) {
        User currentUser = extractUserFromToken(token);
        if (isAdmin(currentUser)) {
            List<User> users = userService.getUsersByRole(role);
            return ResponseEntity.ok(users);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    private User extractUserFromToken(String token) {
        // Implement the logic to extract the user from the token
        // Return the User object
        // For simplicity, let's assume the token contains the user ID
        Long userId = Long.parseLong(token);
        return userService.getUserById(userId);
    }
}