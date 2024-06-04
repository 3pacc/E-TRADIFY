package com.pfa.financePredict.service;

import com.pfa.financePredict.model.*;
import com.pfa.financePredict.repository.PortfolioItemRepository;
import com.pfa.financePredict.repository.PortfolioRepository;
import com.pfa.financePredict.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class PortfolioService {

    @Autowired
    private PortfolioRepository portfolioRepository;
    @Autowired
    private PortfolioItemRepository portfolioItemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CryptoPriceService cryptoPriceService;


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

    public PortfolioItem buyCrypto(String username, BuyCryptoRequest buyRequest) {
        var user = userRepository.findByEmail(username).orElseThrow(() -> new RuntimeException("User not found"));

        var portfolio = portfolioRepository.findByUserId(user.getId()).stream()
                .filter(Portfolio::getTest)
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Test portfolio not found"));

        if (portfolio.getInitialAmount() < buyRequest.getSpendAmount()) {
            throw new RuntimeException("Insufficient balance in portfolio");
        }

        double cryptoPrice = buyRequest.getPrice(); // Utilisez le prix envoyé par le frontend
        double receiveAmount = buyRequest.getSpendAmount() / cryptoPrice;
        buyRequest.setReceiveAmount(receiveAmount);

        PortfolioItem newItem = new PortfolioItem();
        newItem.setPortfolio(portfolio);
        newItem.setQuantity(receiveAmount);
        newItem.setPurchasePrice(cryptoPrice); // Utilisez le prix de l'achat
        newItem.setPurchaseDate(Date.valueOf(LocalDate.now()));
        newItem.setSymbol(buyRequest.getReceiveCurrency());
        newItem.setNetwork(buyRequest.getNetwork());
        newItem.setWalletAddress(buyRequest.getWalletAddress());

        portfolioItemRepository.save(newItem);

        portfolio.setInitialAmount(portfolio.getInitialAmount() - buyRequest.getSpendAmount());
        portfolioRepository.save(portfolio);

        return newItem;
    }

    public PortfolioItem sellCrypto(String username, SellCryptoRequest sellRequest) {
        var user = userRepository.findByEmail(username).orElseThrow(() -> new RuntimeException("User not found"));

        var portfolio = portfolioRepository.findByUserId(user.getId()).stream()
                .filter(Portfolio::getTest)
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Test portfolio not found"));

        var portfolioItem = portfolioItemRepository.findByPortfolioAndSymbol(portfolio, sellRequest.getSpendCurrency())
                .orElseThrow(() -> new RuntimeException("Crypto not found in portfolio"));

        if (portfolioItem.getQuantity() < sellRequest.getSpendAmount()) {
            throw new RuntimeException("Insufficient quantity in portfolio");
        }

        double cryptoPrice = sellRequest.getPrice(); // Utilisez le prix envoyé par le frontend
        double receiveAmount = sellRequest.getSpendAmount() * cryptoPrice;
        sellRequest.setReceiveAmount(receiveAmount);

        portfolioItem.setQuantity(portfolioItem.getQuantity() - sellRequest.getSpendAmount());
        portfolioItemRepository.save(portfolioItem);

        portfolio.setInitialAmount(portfolio.getInitialAmount() + receiveAmount);
        portfolioRepository.save(portfolio);

        return portfolioItem;
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