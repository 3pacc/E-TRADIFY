package com.pfa.financePredict.dal;
import com.pfa.financePredict.model.User;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class dal {
    private static final String DB_URL = "jdbc:sqlserver://localhost:1433;databaseName=PeakPredict;encrypt=true;trustServerCertificate=true";
    private static final String DB_USER = "riad";
    private static final String DB_PASSWORD = "";

    private Connection connection;

    public dal() {
        try {
            connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
            System.out.println("Connected to the database.");
        } catch (SQLException e) {
            System.out.println("Error connecting to the database: " + e.getMessage());
        }
    }

    public List<User> getAllUsers() {
        List<User> users = new ArrayList<>();
        try {
            String query = "SELECT * FROM \"users\"";
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
            System.out.println("Error retrieving users from the database: " + e.getMessage());
        }
        return users;
    }

    public void closeConnection() {
        try {
            if (connection != null && !connection.isClosed()) {
                connection.close();
                System.out.println("Disconnected from the database.");
            }
        } catch (SQLException e) {
            System.out.println("Error closing the database connection: " + e.getMessage());
        }
    }
}
