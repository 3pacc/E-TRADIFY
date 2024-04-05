package com.pfa.financePredict.service;

import com.pfa.financePredict.dal.dal;
import com.pfa.financePredict.model.*;
import com.pfa.financePredict.repository.PortfolioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PortfolioService {

    @Autowired
    private PortfolioRepository portfolioRepository;

    public List<Portfolio> getAllPortfolios() {
        return portfolioRepository.findAll();
    }

    public Portfolio getPortfolioById(Long id) {
        return portfolioRepository.findById(id).orElse(null);
    }

    public List<Portfolio> getPortfoliosByUserId(Long userId) {
        return portfolioRepository.findByUserId(userId);
    }

    public Portfolio createPortfolio(Portfolio portfolio, User currentUser) {
        if (currentUser.getRole() == Role.ADMINISTRATOR || currentUser.getPortfolios() == null) {
            portfolio.setUser(currentUser);
            return portfolioRepository.save(portfolio);
        } else {
            throw new IllegalArgumentException("Trader can have only one portfolio.");
        }
    }

    public Portfolio updatePortfolio(Portfolio portfolio, User currentUser) {
        if (currentUser.getRole() == Role.ADMINISTRATOR || portfolio.getUser().equals(currentUser)) {
            Optional<Portfolio> existingPortfolio = portfolioRepository.findById(portfolio.getId());
            if (existingPortfolio.isPresent()) {
                Portfolio updatedPortfolio = existingPortfolio.get();
                updatedPortfolio.setName(portfolio.getName());
                updatedPortfolio.setDescription(portfolio.getDescription());
                return portfolioRepository.save(updatedPortfolio);
            } else {
                throw new IllegalArgumentException("Portfolio not found with ID: " + portfolio.getId());
            }
        } else {
            throw new IllegalArgumentException("Unauthorized to update this portfolio.");
        }
    }

    public void deletePortfolio(Long id, User currentUser) {
        Portfolio portfolio = getPortfolioById(id);
        if (currentUser.getRole() == Role.ADMINISTRATOR || portfolio.getUser().equals(currentUser)) {
            portfolioRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Unauthorized to delete this portfolio.");
        }
    }
}