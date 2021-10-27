package com.revature.dungeonsite.repositories;

import com.revature.dungeonsite.models.GameAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameAddressRepository extends JpaRepository<GameAddress, Long> {
    public List<GameAddress> findByGameID(Long gameID);
    public List<GameAddress> findByAddressID(Long addressID);
}
