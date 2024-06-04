package com.pfa.financePredict.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class CryptoPriceService {
    private static final String API_URL = "https://api.binance.com/api/v3/ticker/price?symbol=";

    public double getCryptoPrice(String symbol) {
        RestTemplate restTemplate = new RestTemplate();
        String url = API_URL + symbol + "USDT";
        CryptoPriceResponse response = restTemplate.getForObject(url, CryptoPriceResponse.class);
        return response.getPrice();
    }
}
