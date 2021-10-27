package com.revature.dungeonsite.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.revature.dungeonsite.models.Language;
import org.springframework.stereotype.Repository;

@Repository
public interface LanguageRepository extends JpaRepository<Language, Long>{
    Language getByLanguage(String language);
}
