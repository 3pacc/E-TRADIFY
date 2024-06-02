package com.pfa.financePredict.dal;
import com.pfa.financePredict.model.*;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class dao {
    private static final Logger logger = LoggerFactory.getLogger(dao.class);
    private static final String DB_URL = "jdbc:mysql://localhost:3306/PeakPredict?useSSL=false&allowPublicKeyRetrieval=true";
    private static final String DB_USER = "root";
    private static final String DB_PASSWORD = "riad";

    private Connection connection;

    public dao() {
        try {
            connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
            logger.info("Connected to the database.");
        } catch (SQLException e) {
            logger.error("Error connecting to the database: {}", e.getMessage());
        }
    }

    public static void createDatabase() {
        try (Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306?useSSL=false&allowPublicKeyRetrieval=true", DB_USER, DB_PASSWORD)) {
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
                    "id INT AUTO_INCREMENT PRIMARY KEY," +
                    "name VARCHAR(255)," +
                    "email VARCHAR(255)," +
                    "password VARCHAR(255)," +
                    "role VARCHAR(255)," +
                    "test_portfolio BOOLEAN DEFAULT FALSE," +
                    "test_amount DECIMAL(10,2) DEFAULT 0.0" +
                    ")";

            String portfolioTableSql = "CREATE TABLE IF NOT EXISTS portfolios (" +
                    "portfolio_id INT AUTO_INCREMENT PRIMARY KEY," +
                    "user_id INT," +
                    "name VARCHAR(30)," +
                    "description VARCHAR(255)," +
                    "is_test BOOLEAN NOT NULL DEFAULT FALSE," +
                    "initial_amount DECIMAL(10,2)," +  // Ajout de initial_amount
                    "created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP," +
                    "updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP," +
                    "FOREIGN KEY (user_id) REFERENCES users(id)" +
                    ")";

            String portfolioItemTableSql = "CREATE TABLE IF NOT EXISTS portfolio_item (" +
                    "item_id INT AUTO_INCREMENT PRIMARY KEY," +
                    "portfolio_id INT," +
                    "quantity INT," +
                    "purchase_price DECIMAL(10, 2)," +
                    "purchase_date DATE," +
                    "symbol VARCHAR(10)," +
                    "network VARCHAR(50)," +
                    "wallet_address VARCHAR(255)," +
                    "FOREIGN KEY (portfolio_id) REFERENCES portfolios(portfolio_id)" +
                    ")";

            try (Statement statement = connection.createStatement()) {
                statement.execute(userTableSql);
                statement.execute(portfolioTableSql);
                statement.execute(portfolioItemTableSql);
            }
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

    public User getUserByEmail(String email) {
        User user = null;
        try {
            String query = "SELECT * FROM users WHERE email = ?";
            PreparedStatement statement = connection.prepareStatement(query);
            statement.setString(1, email);
            ResultSet resultSet = statement.executeQuery();
            if (resultSet.next()) {
                Long id = resultSet.getLong("id");
                String name = resultSet.getString("name");
                String password = resultSet.getString("password");
                Role role = Role.valueOf(resultSet.getString("role"));
                user = new User(id, name, email, password);
                user.setRole(role);
            }
        } catch (SQLException e) {
            logger.error("Error retrieving user by email: {}", e.getMessage());
        }
        return user;
    }

    public static void createUser(User user) {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD)) {
            String query = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
            try (PreparedStatement statement = connection.prepareStatement(query)) {
                statement.setString(1, user.getName());
                statement.setString(2, user.getEmail());
                statement.setString(3, user.getPassword());
                statement.setString(4, user.getRole().toString());
                statement.executeUpdate();
            }
        } catch (SQLException e) {
            logger.error("Error creating user: {}", e.getMessage());
        }
    }

    public static void createPortfolio(Portfolio portfolio) {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD)) {
            String query = "INSERT INTO portfolio (name, description, user_id) VALUES (?, ?, ?)";
            try (PreparedStatement statement = connection.prepareStatement(query)) {
                statement.setString(1, portfolio.getName());
                statement.setString(2, portfolio.getDescription());
                statement.setLong(3, portfolio.getUser().getId());
                statement.executeUpdate();
            }
        } catch (SQLException e) {
            logger.error("Error creating portfolio: {}", e.getMessage());
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

