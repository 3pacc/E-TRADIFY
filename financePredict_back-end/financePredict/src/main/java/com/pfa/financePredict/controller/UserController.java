package com.pfa.financePredict.controller;

import com.pfa.financePredict.model.User;
import com.pfa.financePredict.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if(userService.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email is already taken!");
        }
        userService.saveUser(user);
        return ResponseEntity.ok("User registered successfully!");
    }
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody User user) {
        Optional<User> foundUser = userService.findByEmail(user.getEmail());

        if(foundUser.isPresent()) {
            // This is where you'd typically check the password hash. For simplicity, we're directly comparing the plaintext password.
            // WARNING: Comparing plaintext passwords is insecure and not recommended for real applications.
            if(foundUser.get().getPassword().equals(user.getPassword())) {
                return ResponseEntity.ok("User authenticated successfully!");
            } else {
                return ResponseEntity.badRequest().body("Invalid password!");
            }
        } else {
            return ResponseEntity.badRequest().body("User not found!");
        }
    }
    
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
    
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }
    
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }
    
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        user.setId(id);
        return userService.updateUser(user);
    }
    
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

}
