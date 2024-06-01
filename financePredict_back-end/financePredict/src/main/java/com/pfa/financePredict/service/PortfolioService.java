package com.pfa.financePredict.service;

import com.pfa.financePredict.model.*;
import com.pfa.financePredict.repository.PortfolioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Service
public class PortfolioService {

    @Autowired
    private PortfolioRepository portfolioRepository;


    public Portfolio createPortfolio(Portfolio portfolio, User user) {
        if (user.getRole() == Role.ADMINISTRATOR || (user.getPortfolios() != null && user.getPortfolios().isEmpty())) {
            portfolio.setUser(user);
            portfolio.setCreatedAt(new Timestamp(System.currentTimeMillis()));
            portfolio.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
            return portfolioRepository.save(portfolio);
        } else {
            throw new IllegalArgumentException("Trader can have only one portfolio.");
        }
    }


    public List<Portfolio> getAllPortfolios() {
        return portfolioRepository.findAll();
    }

    public Portfolio getPortfolioById(Long id) {
        return portfolioRepository.findById(id).orElse(null);
    }

    public List<Portfolio> getPortfoliosByUserId(Long userId) {
        return portfolioRepository.findByUserId(userId);
    }

    public Portfolio updatePortfolio(Portfolio portfolio, User currentUser) {
        Portfolio existingPortfolio = portfolioRepository.findById(portfolio.getPortfolioId())
                .orElseThrow(() -> new IllegalArgumentException("Portfolio not found"));

        if (currentUser.getRole() == Role.ADMINISTRATOR || existingPortfolio.getUser().equals(currentUser)) {
            existingPortfolio.setName(portfolio.getName());
            existingPortfolio.setDescription(portfolio.getDescription());

            // Vérifiez l'utilisateur spécifié pour le portfolio
            User newUser = portfolio.getUser();
            if (newUser != null) {
                existingPortfolio.setUser(newUser);
            }
            return portfolioRepository.save(existingPortfolio);
        } else {
            throw new IllegalArgumentException("You are not authorized to update this portfolio.");
        }
    }

    public void deletePortfolio(Long id, User currentUser) {
        Portfolio existingPortfolio = portfolioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Portfolio not found"));

        if (currentUser.getRole() == Role.ADMINISTRATOR || existingPortfolio.getUser().equals(currentUser)) {
            portfolioRepository.delete(existingPortfolio);
        } else {
            throw new IllegalArgumentException("You are not authorized to delete this portfolio.");
        }
    }
}