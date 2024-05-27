package com.pfa.financePredict.service;
import com.pfa.financePredict.model.User;
import com.pfa.financePredict.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.pfa.financePredict.dal.*;

import java.util.List;
import java.util.Optional;
import java.util.Vector;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public void createUser(User user) {
        dao.createUser(user);
    }


    public User updateUser(User user) {
        Optional<User> existingUser = userRepository.findById(user.getId());
        if (existingUser.isPresent()) {
            User updatedUser = existingUser.get();
            updatedUser.setName(user.getName());
            updatedUser.setEmail(user.getEmail());
            updatedUser.setPassword(user.getPassword());
            return userRepository.save(updatedUser);
        } else {
            throw new IllegalArgumentException("User not found with ID: " + user.getId());
        }
    }

    public List<User> getUsersByRole(String role) {
        return userRepository.findByRole(role);
    }
    
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Load user from your data source based on the email
        User user = getUserByEmail(email);

        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }

        // Create and return a UserDetails object based on the User entity
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                new Vector<>() // Add user's roles and authorities here
        );
    }
}