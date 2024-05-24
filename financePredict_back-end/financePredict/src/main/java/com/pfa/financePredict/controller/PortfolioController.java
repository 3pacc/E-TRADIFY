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

    private final PortfolioService portfolioService;
    private final UserService userService;

    @Autowired
    public PortfolioController(PortfolioService portfolioService, UserService userService) {
        this.portfolioService = portfolioService;
        this.userService = userService;
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
        // Vérifier si l'utilisateur existe
        User currentUser = extractUserFromToken(token);
        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // Vérifier l'utilisateur spécifié dans le corps de la requête
        Long userId = portfolio.getUser().getId();
        User user = userService.getUserById(userId);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        // Associer le portfolio à l'utilisateur spécifié
        portfolio.setUser(user);
        Portfolio createdPortfolio = portfolioService.createPortfolio(portfolio, user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPortfolio);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Portfolio> updatePortfolio(@PathVariable Long id, @RequestBody Portfolio portfolio, @RequestHeader("Authorization") String token) {
        // Vérifier si l'utilisateur existe
        User currentUser = extractUserFromToken(token);
        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // Vérifier l'utilisateur spécifié dans le corps de la requête
        Long userId = portfolio.getUser().getId();
        User user = userService.getUserById(userId);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        portfolio.setPortfolioId(id);
        portfolio.setUser(user);
        Portfolio updatedPortfolio = portfolioService.updatePortfolio(portfolio, currentUser);
        return ResponseEntity.ok(updatedPortfolio);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePortfolio(@PathVariable Long id, @RequestHeader("Authorization") String token) {
        User currentUser = extractUserFromToken(token);
        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        portfolioService.deletePortfolio(id, currentUser);
        return ResponseEntity.noContent().build();
    }

    private User extractUserFromToken(String token) {
        try {
            Long userId = Long.parseLong(token);
            return userService.getUserById(userId);
        } catch (NumberFormatException e) {
            return null;
        }
    }
}