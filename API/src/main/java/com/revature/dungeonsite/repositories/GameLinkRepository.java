package com.revature.dungeonsite.repositories;

import com.revature.dungeonsite.models.GameLink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameLinkRepository extends JpaRepository<GameLink, Long> {
    public List<GameLink> findByGameID(Long gameID);
    public List<GameLink> findByLinkID(Long linkID);
}
