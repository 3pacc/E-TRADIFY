package com.pfa.financePredict.repository;

import com.pfa.financePredict.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByRole(String role);
    @Modifying
    @Query("UPDATE User u SET  u.password = :password WHERE u.id = :userId")
    void updatePassword(@Param("userId") Long userId, @Param("password") String password);
    @Modifying
    @Query("UPDATE User u SET u.email = :email WHERE u.id = :userId")
    void updateEmail(@Param("userId") Long userId, @Param("email") String email);

}