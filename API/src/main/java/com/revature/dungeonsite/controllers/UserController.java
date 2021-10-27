package com.revature.dungeonsite.controllers;

import com.revature.dungeonsite.exceptions.ResourceNotFoundException;
import com.revature.dungeonsite.exceptions.UserNotFoundException;
import com.revature.dungeonsite.models.Game;
import com.revature.dungeonsite.models.SiteUser;
import com.revature.dungeonsite.models.UserGame;
import com.revature.dungeonsite.repositories.UserGameRepository;
import com.revature.dungeonsite.repositories.UserRepository;
import com.revature.dungeonsite.utils.KeyUtils;
import com.revature.dungeonsite.utils.PasswordUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/users")
public class UserController {
    private final GameController gc;
    private final UserRepository users;
    private final UserGameRepository ug;

    public UserController(GameController gamCon, UserGameRepository ugr, UserRepository users) {
        this.gc = gamCon;
        this.ug = ugr;
        this.users = users;
    }

    @GetMapping
    public ResponseEntity<List<SiteUser>> findAll() {
        return ResponseEntity.ok(this.users.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SiteUser> getUserByID(@PathVariable(value="id") Long userID)
            throws UserNotFoundException {
        SiteUser user = getNeoUser(userID);
        return ResponseEntity.ok().body(user);
    }

    @GetMapping("game/{id}")
    public ResponseEntity<HashSet<Game>> findGamesByUserID(@PathVariable(value="id") Long ID)
            throws ResourceNotFoundException {
        List<UserGame> listUG = ug.findByUserID(ID);
        HashSet<Game> list = new HashSet<>();

        for (UserGame ug: listUG) {
            list.add(gc.getGameByGameID(ug.getGameID()) );
        }

        return ResponseEntity.ok(list);
    }

    @GetMapping("/name/{username}")
    public ResponseEntity<SiteUser> getUserByUsername(@PathVariable(value="username") Long username)
            throws UserNotFoundException {
        SiteUser user = getNeoUser(username);
        return ResponseEntity.ok().body(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SiteUser> updateUser(@PathVariable(value = "id") Long userID,
        @RequestBody SiteUser user) throws UserNotFoundException {
        SiteUser neoUser = getNeoUser(userID);
        if (user.getUsername() != null && !user.getUsername().equals(""))
            neoUser.setUsername(user.getUsername());
        if (user.getPassword() != null && !user.getPassword().equals("")
            && !user.getPassword().equals(neoUser.getPassword()) )
            neoUser.setPassword(PasswordUtils.encrypt(user.getPassword()) );
        if (user.getFirstName() != null && !user.getFirstName().equals(""))
            neoUser.setFirstName(user.getFirstName());
        if (user.getLastName() != null && !user.getLastName().equals(""))
            neoUser.setLastName(user.getLastName());
        if (user.getEmail() != null && !user.getEmail().equals(""))
            neoUser.setEmail(user.getEmail());

        return ResponseEntity.ok(this.users.save(neoUser));
    }

    private SiteUser getNeoUser(@PathVariable("id") Long userID) throws UserNotFoundException {
        return users.findById(userID)
                .orElseThrow(
                        () -> new UserNotFoundException("User not found for ID: " + userID)
                );
    }

    @PostMapping
    public SiteUser makeUser(@RequestBody SiteUser neoUser) {
        neoUser.setUserID(KeyUtils.nextKey());
        neoUser.setPassword(PasswordUtils.encrypt(neoUser.getPassword()) );
        return this.users.save(neoUser);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteUser(@PathVariable(value = "id") Long userID)
            throws UserNotFoundException {
        SiteUser oldUser = getNeoUser(userID);
        this.users.delete(oldUser);

        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);

        return response;
    }
}
