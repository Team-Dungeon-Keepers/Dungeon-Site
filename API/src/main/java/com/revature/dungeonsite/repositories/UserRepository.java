package com.revature.dungeonsite.repositories;

import com.revature.dungeonsite.models.SiteUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<SiteUser, Long> {
    public SiteUser findByUsername(String username);
}
