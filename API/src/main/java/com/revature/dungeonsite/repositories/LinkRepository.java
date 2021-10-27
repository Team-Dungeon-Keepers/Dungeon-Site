package com.revature.dungeonsite.repositories;

import com.revature.dungeonsite.models.Link;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LinkRepository extends JpaRepository<Link, Long>{
    Link getByUrl(String url);
}
