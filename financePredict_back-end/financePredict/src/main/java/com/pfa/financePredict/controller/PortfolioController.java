package com.pfa.financePredict.controller;

import com.pfa.financePredict.model.Portfolio;
import com.pfa.financePredict.model.User;
import com.pfa.financePredict.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/portfolios")
public class PortfolioController {

    @Autowired
    private PortfolioService portfolioService;
    private UserService userService;
    @GetMapping
    public ResponseEntity<List<Portfolio>> getAllPortfolios() {
        List<Portfolio> portfolios = portfolioService.getAllPortfolios();
        return ResponseEntity.ok(portfolios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Portfolio> getPortfolioById(@PathVariable Long id) {
        Portfolio portfolio = portfolioService.getPortfolioById(id);
        if (portfolio != null) {
            return ResponseEntity.ok(portfolio);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Portfolio>> getPortfoliosByUserId(@PathVariable Long userId) {
        List<Portfolio> portfolios = portfolioService.getPortfoliosByUserId(userId);
        return ResponseEntity.ok(portfolios);
    }

    @PostMapping
    public ResponseEntity<Portfolio> createPortfolio(@RequestBody Portfolio portfolio, @RequestHeader("Authorization") String token) {
        User currentUser = extractUserFromToken(token);
        Portfolio createdPortfolio = portfolioService.createPortfolio(portfolio, currentUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPortfolio);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Portfolio> updatePortfolio(@PathVariable Long id, @RequestBody Portfolio portfolio, @RequestHeader("Authorization") String token) {
        User currentUser = extractUserFromToken(token);
        portfolio.setId(id);
        Portfolio updatedPortfolio = portfolioService.updatePortfolio(portfolio, currentUser);
        return ResponseEntity.ok(updatedPortfolio);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePortfolio(@PathVariable Long id, @RequestHeader("Authorization") String token) {
        User currentUser = extractUserFromToken(token);
        portfolioService.deletePortfolio(id, currentUser);
        return ResponseEntity.noContent().build();
    }

    private User extractUserFromToken(String token) {
        // Implement the logic to extract the user from the token
        // Return the User object
        // For simplicity, let's assume the token contains the user ID
        Long userId = Long.parseLong(token);
        return userService.getUserById(userId);

    }
}