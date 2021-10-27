package com.revature.dungeonsite.repositories;

import com.revature.dungeonsite.models.GameSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameScheduleRepository extends JpaRepository<GameSchedule, Long> {
    public List<GameSchedule> findByGameID(Long gameID);
    public List<GameSchedule> findByScheduleID(Long linkID);
}
