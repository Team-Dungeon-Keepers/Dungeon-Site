package com.revature.dungeonsite.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.revature.dungeonsite.models.Phone;
import org.springframework.stereotype.Repository;

@Repository
public interface PhoneRepository extends JpaRepository<Phone, Long>{
    Optional<Phone> findByNumber(long number);
}
