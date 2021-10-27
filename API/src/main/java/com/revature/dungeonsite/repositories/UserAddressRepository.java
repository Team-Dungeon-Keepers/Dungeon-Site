package com.revature.dungeonsite.repositories;

import com.revature.dungeonsite.models.UserAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserAddressRepository extends JpaRepository<UserAddress, Long> {
    public List<UserAddress> findByUserID(Long userID);
    public List<UserAddress> findByAddressID(Long addressID);
}
