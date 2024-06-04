package com.pfa.financePredict.model;

public class BuyCryptoRequest {
    private double spendAmount;
    private String spendCurrency;
    private double receiveAmount;
    private String receiveCurrency;
    private String network;
    private String walletAddress;
    private double price;

    public double getSpendAmount() {
        return spendAmount;
    }

    public void setSpendAmount(double spendAmount) {
        this.spendAmount = spendAmount;
    }

    public String getSpendCurrency() {
        return spendCurrency;
    }

    public void setSpendCurrency(String spendCurrency) {
        this.spendCurrency = spendCurrency;
    }

    public double getReceiveAmount() {
        return receiveAmount;
    }

    public void setReceiveAmount(double receiveAmount) {
        this.receiveAmount = receiveAmount;
    }

    public String getReceiveCurrency() {
        return receiveCurrency;
    }

    public void setReceiveCurrency(String receiveCurrency) {
        this.receiveCurrency = receiveCurrency;
    }

    public String getNetwork() {
        return network;
    }

    public void setNetwork(String network) {
        this.network = network;
    }

    public String getWalletAddress() {
        return walletAddress;
    }

    public void setWalletAddress(String walletAddress) {
        this.walletAddress = walletAddress;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
