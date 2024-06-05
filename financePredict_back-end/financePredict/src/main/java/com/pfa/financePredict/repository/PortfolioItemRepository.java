package com.pfa.financePredict.repository;

import com.pfa.financePredict.model.Portfolio;
import com.pfa.financePredict.model.PortfolioItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PortfolioItemRepository extends JpaRepository<PortfolioItem, Long> {
    Optional<PortfolioItem> findByPortfolioAndSymbol(Portfolio portfolio, String symbol);
}