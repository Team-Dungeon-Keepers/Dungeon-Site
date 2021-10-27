package com.revature.dungeonsite.repositories;

import com.revature.dungeonsite.models.UserLanguage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserLanguageRepository extends JpaRepository<UserLanguage, Long> {
    public UserLanguage findByUserID(Long userID);
    public UserLanguage findByLanguageID(Long languageID);
}
