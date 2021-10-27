package com.revature.dungeonsite.repositories;

import com.revature.dungeonsite.models.UserPhone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserPhoneRepository extends JpaRepository<UserPhone, Long> {
    public UserPhone findByUserID(Long userID);
    public UserPhone findByPhoneID(Long phoneID);
}
