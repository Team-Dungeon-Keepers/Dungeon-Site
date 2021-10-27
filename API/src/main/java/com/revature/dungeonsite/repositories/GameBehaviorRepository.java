package com.revature.dungeonsite.repositories;

import com.revature.dungeonsite.models.GameBehavior;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameBehaviorRepository extends JpaRepository<GameBehavior, Long> {
    public List<GameBehavior> findByGameID(Long gameID);
    public List<GameBehavior> findByBehaviorID(Long behaviorID);
}
