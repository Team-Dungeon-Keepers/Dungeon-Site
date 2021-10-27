package com.revature.dungeonsite.controllers;

import com.revature.dungeonsite.exceptions.ResourceNotFoundException;
import com.revature.dungeonsite.models.UserPhone;
import com.revature.dungeonsite.repositories.UserPhoneRepository;
import com.revature.dungeonsite.utils.KeyUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResourceAccessException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/user_phone")
public class UserPhoneController {
    private UserPhoneRepository upr;

    public UserPhoneController(UserPhoneRepository ur) {
        this.upr = ur;
    }

	private UserPhone getNeoUserPhone(@PathVariable("id") Long ID) throws ResourceNotFoundException {
        return upr.findById(ID)
                .orElseThrow(
                        () -> new ResourceAccessException("No User_Game found with ID: "+ ID)
                );
    }

    @GetMapping
    public ResponseEntity<List<UserPhone>> findAll() {
        return ResponseEntity.ok(this.upr.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserPhone> findByID(@PathVariable(value="id") Long ID)
            throws ResourceNotFoundException {
        UserPhone userPhone = getNeoUserPhone(ID);
        return ResponseEntity.ok().body(userPhone);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserPhone> updateUserPhone(@PathVariable(value = "id") Long ID,
        @RequestBody UserPhone userPhone) throws ResourceNotFoundException {
        UserPhone neoUserPhone = getNeoUserPhone(ID);
        if (userPhone.getUserID() != null)
            neoUserPhone.setUserID(userPhone.getUserID());
        if (userPhone.getPhoneID() != null)
            neoUserPhone.setPhoneID(userPhone.getPhoneID());
        return ResponseEntity.ok(this.upr.save(neoUserPhone));
    }

    @PostMapping
    public UserPhone makeUserPhone(@RequestBody UserPhone neoUserPhone) {
		neoUserPhone.setID(KeyUtils.nextKey());
        return this.upr.save(neoUserPhone);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteUserPhone(@PathVariable(value = "id") Long ID)
            throws ResourceNotFoundException {
        UserPhone oldUserPhone = getNeoUserPhone(ID);
        this.upr.delete(oldUserPhone);

        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
