package com.revature.dungeonsite.repositories;

import com.revature.dungeonsite.models.UserGame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserGameRepository extends JpaRepository<UserGame, Long> {
    public List<UserGame> findByUserID(Long userID);
    public List<UserGame> findByGameID(Long gameID);
}
