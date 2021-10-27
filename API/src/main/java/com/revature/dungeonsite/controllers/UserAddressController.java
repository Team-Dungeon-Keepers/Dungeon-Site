package com.revature.dungeonsite.controllers;

import com.revature.dungeonsite.exceptions.ResourceNotFoundException;
import com.revature.dungeonsite.models.UserAddress;
import com.revature.dungeonsite.repositories.UserAddressRepository;
import com.revature.dungeonsite.utils.KeyUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/user_address")
public class UserAddressController {
    private UserAddressRepository uar;

    public UserAddressController(UserAddressRepository ur) {
        this.uar = ur;
    }

	private UserAddress getNeoUserAddress(@PathVariable("id") Long ID) throws ResourceNotFoundException {
        return uar.findById(ID).orElseThrow(
                () -> new ResourceNotFoundException("No such UserAddress: " + ID)
        );
    }

    @GetMapping
    public ResponseEntity<List<UserAddress>> findAll() {
        return ResponseEntity.ok(this.uar.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserAddress> findByID(@PathVariable(value="id") Long ID)
            throws ResourceNotFoundException {
        UserAddress userAddress = getNeoUserAddress(ID);
        return ResponseEntity.ok().body(userAddress);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserAddress> updateUserAddress(@PathVariable(value = "id") Long ID,
        @RequestBody UserAddress userAddress) throws ResourceNotFoundException {
        UserAddress neoUserAddress = getNeoUserAddress(ID);
        if (userAddress.getUserID() != null)
            neoUserAddress.setUserID(userAddress.getUserID());
        if (userAddress.getAddressID() != null)
            neoUserAddress.setAddressID(userAddress.getAddressID());
        return ResponseEntity.ok(this.uar.save(neoUserAddress));
    }

    @PostMapping
    public UserAddress makeUserAddress(@RequestBody UserAddress neoUserAddress) {
		neoUserAddress.setID(KeyUtils.nextKey());
        return this.uar.save(neoUserAddress);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteUserAddress(@PathVariable(value = "id") Long ID)
            throws ResourceNotFoundException {
        UserAddress oldUserAddress = getNeoUserAddress(ID);
        this.uar.delete(oldUserAddress);

        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
