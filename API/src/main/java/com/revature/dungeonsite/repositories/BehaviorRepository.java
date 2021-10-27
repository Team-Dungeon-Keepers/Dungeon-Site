package com.revature.dungeonsite.repositories;

import com.revature.dungeonsite.models.Behavior;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BehaviorRepository extends JpaRepository<Behavior, Long> {
    public Behavior findByBehavior(String bString);
}
