package com.revature.dungeonsite.repositories;

import com.revature.dungeonsite.models.UserLink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserLinkRepository extends JpaRepository<UserLink, Long> {
    public UserLink findByUserID(Long userID);
    public UserLink findByLinkID(Long linkID);
}
