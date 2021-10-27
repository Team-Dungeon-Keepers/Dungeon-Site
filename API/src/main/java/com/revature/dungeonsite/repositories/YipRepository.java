package com.revature.dungeonsite.repositories;

import com.revature.dungeonsite.models.YipMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface YipRepository extends JpaRepository<YipMessage, Long> {
}
