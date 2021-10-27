package com.revature.dungeonsite.controllers;

import com.revature.dungeonsite.exceptions.ResourceNotFoundException;
import com.revature.dungeonsite.models.UserGame;
import com.revature.dungeonsite.repositories.UserGameRepository;
import com.revature.dungeonsite.utils.KeyUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResourceAccessException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/user_game")
public class UserGameController {
    private UserGameRepository ugr;

    public UserGameController(UserGameRepository ur) {
        this.ugr = ur;
    }

	private UserGame getNeoUserGame(@PathVariable("id") Long ID) throws ResourceNotFoundException {
        return ugr.findById(ID)
                .orElseThrow(
                        () -> new ResourceAccessException("No User_Game found with ID: "+ ID)
                );
    }

    @GetMapping
    public ResponseEntity<List<UserGame>> findAll() {
        return ResponseEntity.ok(this.ugr.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserGame> findByID(@PathVariable(value="id") Long ID)
            throws ResourceNotFoundException {
        UserGame userAddress = getNeoUserGame(ID);
        return ResponseEntity.ok().body(userAddress);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserGame> updateUserGame(@PathVariable(value = "id") Long ID,
        @RequestBody UserGame userAddress) throws ResourceNotFoundException {
        UserGame neoUserGame = getNeoUserGame(ID);
        if (userAddress.getUserID() != null)
            neoUserGame.setUserID(userAddress.getUserID());
        if (userAddress.getGameID() != null)
            neoUserGame.setGameID(userAddress.getGameID());
        return ResponseEntity.ok(this.ugr.save(neoUserGame));
    }

    @PostMapping
    public UserGame makeUserGame(@RequestBody UserGame neoUserGame) {
		neoUserGame.setID(KeyUtils.nextKey());
        return this.ugr.save(neoUserGame);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteUserGame(
            @PathVariable(value = "id") Long ID,
            @RequestBody( required = false) UserGame optional)
            throws ResourceNotFoundException {
        UserGame oldUserGame;

        if (ID == 0) {
            oldUserGame = findByStub(optional.getUserID(), optional.getGameID());
        } else {
            oldUserGame = getNeoUserGame(ID);
        }

        if (oldUserGame.getID() != 0)
            this.ugr.delete(oldUserGame);

        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    private UserGame findByStub(Long userID, Long gameID) {
        List<UserGame> listA = this.ugr.findByUserID(userID);

        for (UserGame item : listA) {
            if (item.getGameID() == gameID)
                return item;
        }

        return new UserGame();
    }
}
