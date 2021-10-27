package com.revature.dungeonsite.controllers;

import com.revature.dungeonsite.exceptions.ResourceNotFoundException;
import com.revature.dungeonsite.models.GameLanguage;
import com.revature.dungeonsite.repositories.GameLanguageRepository;
import com.revature.dungeonsite.utils.KeyUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

//possibly change mapping later?
@RestController
@CrossOrigin
@RequestMapping("/api/game_language")
public class GameLanguageController {
    private GameLanguageRepository glr;

    public GameLanguageController(GameLanguageRepository gr) {
        this.glr = gr;
    }

	private GameLanguage getNeoGameLanguage(@PathVariable("id") Long ID) throws ResourceNotFoundException {
        return glr.findById(ID)
                .orElseThrow(
                        () -> new ResourceNotFoundException("No Game_Language with ID: " + ID)
                );
    }

    @GetMapping
    public ResponseEntity<List<GameLanguage>> findAll() {
        return ResponseEntity.ok(this.glr.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GameLanguage> findByID(@PathVariable(value="id") Long ID)
            throws ResourceNotFoundException {
        GameLanguage gameBehavior = getNeoGameLanguage(ID);
        return ResponseEntity.ok().body(gameBehavior);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GameLanguage> updateGameLanguage(@PathVariable(value = "id") Long ID,
        @RequestBody GameLanguage gameBehavior) throws ResourceNotFoundException {
        GameLanguage neoGameLanguage = getNeoGameLanguage(ID);
        if (gameBehavior.getGameID() != null)
            neoGameLanguage.setGameID(gameBehavior.getGameID());
        if (gameBehavior.getLanguageID() != null)
            neoGameLanguage.setLanguageID(gameBehavior.getLanguageID());
        return ResponseEntity.ok(this.glr.save(neoGameLanguage));
    }

    @PostMapping
    public GameLanguage makeGameLanguage(@RequestBody GameLanguage neoGameLanguage) {
		neoGameLanguage.setID(KeyUtils.nextKey());
        return this.glr.save(neoGameLanguage);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteGameLanguage(@PathVariable(value = "id") Long ID)
            throws ResourceNotFoundException {
        GameLanguage oldGameLanguage = getNeoGameLanguage(ID);
        this.glr.delete(oldGameLanguage);

        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
