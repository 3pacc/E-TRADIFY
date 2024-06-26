package com.pfa.financePredict.repository;

import com.pfa.financePredict.model.Portfolio;
import com.pfa.financePredict.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {
    List<Portfolio> findByUserId(Long userId);
    Portfolio findByUserAndIsTest(User user, boolean isTest);
}