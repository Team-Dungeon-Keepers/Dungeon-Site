package com.revature.dungeonsite.controllers;

import com.revature.dungeonsite.exceptions.ResourceNotFoundException;
import com.revature.dungeonsite.models.UserLanguage;
import com.revature.dungeonsite.repositories.UserLanguageRepository;
import com.revature.dungeonsite.utils.KeyUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResourceAccessException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/user_language")
public class UserLanguageController {
    private UserLanguageRepository ulr;

    public UserLanguageController(UserLanguageRepository ur) {
        this.ulr = ur;
    }

	private UserLanguage getNeoUserLanguage(@PathVariable("id") Long ID) throws ResourceNotFoundException {
        return ulr.findById(ID)
                .orElseThrow(
                        () -> new ResourceAccessException("No User_Game found with ID: "+ ID)
                );
    }

    @GetMapping
    public ResponseEntity<List<UserLanguage>> findAll() {
        return ResponseEntity.ok(this.ulr.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserLanguage> findByID(@PathVariable(value="id") Long ID)
            throws ResourceNotFoundException {
        UserLanguage userAddress = getNeoUserLanguage(ID);
        return ResponseEntity.ok().body(userAddress);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserLanguage> updateUserLanguage(@PathVariable(value = "id") Long ID,
        @RequestBody UserLanguage userAddress) throws ResourceNotFoundException {
        UserLanguage neoUserLanguage = getNeoUserLanguage(ID);
        if (userAddress.getUserID() != null)
            neoUserLanguage.setUserID(userAddress.getUserID());
        if (userAddress.getLanguageID() != null)
            neoUserLanguage.setLanguageID(userAddress.getLanguageID());
        return ResponseEntity.ok(this.ulr.save(neoUserLanguage));
    }

    @PostMapping
    public UserLanguage makeUserLanguage(@RequestBody UserLanguage neoUserLanguage) {
		neoUserLanguage.setID(KeyUtils.nextKey());
        return this.ulr.save(neoUserLanguage);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteUserLanguage(@PathVariable(value = "id") Long ID)
            throws ResourceNotFoundException {
        UserLanguage oldUserLanguage = getNeoUserLanguage(ID);
        this.ulr.delete(oldUserLanguage);

        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
