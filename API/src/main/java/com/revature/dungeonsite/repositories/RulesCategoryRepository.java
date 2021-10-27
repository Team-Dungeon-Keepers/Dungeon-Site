package com.revature.dungeonsite.repositories;

import com.revature.dungeonsite.models.RulesCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RulesCategoryRepository extends JpaRepository<RulesCategory, Long> {
}
