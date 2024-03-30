package com.pfa.financePredict.dal;
import com.pfa.financePredict.model.User;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class dal {
    private static final Logger logger = LoggerFactory.getLogger(dal.class);
    private static final String DB_URL = "jdbc:mysql://localhost:3306/PeakPredict?useSSL=false";
    private static final String DB_USER = "root";
    private static final String DB_PASSWORD = "riad";

    private Connection connection;

    public dal() {
        try {
            connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
            logger.info("Connected to the database.");
        } catch (SQLException e) {
            logger.error("Error connecting to the database: {}", e.getMessage());
        }
    }

    public static void createDatabase() {
        try (Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306?useSSL=false", DB_USER, DB_PASSWORD)) {
            String sql = "CREATE DATABASE IF NOT EXISTS PeakPredict";
            try (Statement statement = connection.createStatement()) {
                statement.execute(sql);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void createTables() {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD)) {
            String userTableSql = "CREATE TABLE IF NOT EXISTS users (" +
                    "id BIGINT AUTO_INCREMENT PRIMARY KEY," +
                    "name VARCHAR(255)," +
                    "email VARCHAR(255)," +
                    "password VARCHAR(255)" +
                    ")";
            try (Statement statement = connection.createStatement()) {
                statement.execute(userTableSql);
            }

            // Create other tables (Portfolio, PortfolioItem, MarketData, PredictionModel, Transaction) here

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public List<User> getAllUsers() {
        List<User> users = new ArrayList<>();
        try {
            String query = "SELECT * FROM users";
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery(query);
            while (resultSet.next()) {
                Long id = resultSet.getLong("id");
                String name = resultSet.getString("name");
                String email = resultSet.getString("email");
                String password = resultSet.getString("password");
                User user = new User(id, name, email, password);
                users.add(user);
            }
        } catch (SQLException e) {
            logger.error("Error retrieving users from the database: {}", e.getMessage());
        }
        return users;
    }

    public User getUserById(Long id) {
        User user = null;
        try {
            String query = "SELECT * FROM users WHERE id = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setLong(1, id);
            ResultSet resultSet = statement.executeQuery();
            if (resultSet.next()) {
                String name = resultSet.getString("name");
                String email = resultSet.getString("email");
                String password = resultSet.getString("password");
                user = new User(id, name, email, password);
            }
        } catch (SQLException e) {
            logger.error("Error retrieving user by ID: {}", e.getMessage());
        }
        return user;
    }

    public static void createUser(User user) {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD)) {
            String query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
            try (PreparedStatement statement = connection.prepareStatement(query)) {
                statement.setString(1, user.getName());
                statement.setString(2, user.getEmail());
                statement.setString(3, user.getPassword());
                statement.executeUpdate();
            }
        } catch (SQLException e) {
            logger.error("Error creating user: {}", e.getMessage());
        }
    }

    public void updateUser(User user) {
        try {
            String query = "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, user.getName());
            statement.setString(2, user.getEmail());
            statement.setString(3, user.getPassword());
            statement.setLong(4, user.getId());
            statement.executeUpdate();
        } catch (SQLException e) {
            logger.error("Error updating user: {}", e.getMessage());
        }
    }

    public void deleteUser(Long id) {
        try {
            String query = "DELETE FROM users WHERE id = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setLong(1, id);
            statement.executeUpdate();
        } catch (SQLException e) {
            logger.error("Error deleting user: {}", e.getMessage());
        }
    }

    public void closeConnection() {
        try {
            if (connection != null && !connection.isClosed()) {
                connection.close();
                logger.info("Disconnected from the database.");
            }
        } catch (SQLException e) {
            logger.error("Error closing the database connection: {}", e.getMessage());
        }
    }

    public static void main(String[] args) {
        createDatabase();
        createTables();
    }
}

