package com.revature.dungeonsite.controllers;

import com.revature.dungeonsite.exceptions.ResourceNotFoundException;
import com.revature.dungeonsite.models.UserLink;
import com.revature.dungeonsite.repositories.UserLinkRepository;
import com.revature.dungeonsite.utils.KeyUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResourceAccessException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/user_link")
public class UserLinkController {
    private UserLinkRepository ulr;

    public UserLinkController(UserLinkRepository ur) {
        this.ulr = ur;
    }

	private UserLink getNeoUserLink(@PathVariable("id") Long ID) throws ResourceNotFoundException {
        return ulr.findById(ID)
                .orElseThrow(
                        () -> new ResourceAccessException("No User_Game found with ID: "+ ID)
                );
    }

    @GetMapping
    public ResponseEntity<List<UserLink>> findAll() {
        return ResponseEntity.ok(this.ulr.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserLink> findByID(@PathVariable(value="id") Long ID)
            throws ResourceNotFoundException {
        UserLink userLink = getNeoUserLink(ID);
        return ResponseEntity.ok().body(userLink);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserLink> updateUserLink(@PathVariable(value = "id") Long ID,
        @RequestBody UserLink userLink) throws ResourceNotFoundException {
        UserLink neoUserLink = getNeoUserLink(ID);
        if (userLink.getUserID() != null)
            neoUserLink.setUserID(userLink.getUserID());
        if (userLink.getLinkID() != null)
            neoUserLink.setLinkID(userLink.getLinkID());
        return ResponseEntity.ok(this.ulr.save(neoUserLink));
    }

    @PostMapping
    public UserLink makeUserLink(@RequestBody UserLink neoUserLink) {
		neoUserLink.setID(KeyUtils.nextKey());
        return this.ulr.save(neoUserLink);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteUserLink(@PathVariable(value = "id") Long ID)
            throws ResourceNotFoundException {
        UserLink oldUserLink = getNeoUserLink(ID);
        this.ulr.delete(oldUserLink);

        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
