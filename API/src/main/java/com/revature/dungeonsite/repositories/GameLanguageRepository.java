package com.revature.dungeonsite.repositories;

import com.revature.dungeonsite.models.GameLanguage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameLanguageRepository extends JpaRepository<GameLanguage, Long> {
    public List<GameLanguage> findByGameID(Long gameID);
    public List<GameLanguage> findByLanguageID(Long languageID);
}
