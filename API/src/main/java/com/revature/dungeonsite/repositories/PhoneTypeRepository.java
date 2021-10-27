package com.revature.dungeonsite.repositories;

import com.revature.dungeonsite.models.PhoneType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhoneTypeRepository extends JpaRepository<PhoneType, Long> {
}
