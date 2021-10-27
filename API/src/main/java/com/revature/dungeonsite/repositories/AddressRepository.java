package com.revature.dungeonsite.repositories;

import com.revature.dungeonsite.models.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    public Address findByStreet(String street);
    public Address findByCity(String city);
    public Address findByState(String state);
    public Address findByZip(Long zip);
}
