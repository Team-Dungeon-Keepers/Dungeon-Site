package com.revature.dungeonsite.repositories;

import com.revature.dungeonsite.models.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
    public Game findByGameName(String gameName);
    public List<Game> findByGameMasterID(Long gameMasterID);
    public List<Game> findByRulesID(Long rulesID);
}
