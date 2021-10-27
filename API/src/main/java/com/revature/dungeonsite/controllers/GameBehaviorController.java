package com.revature.dungeonsite.controllers;

import com.revature.dungeonsite.exceptions.ResourceNotFoundException;
import com.revature.dungeonsite.models.GameBehavior;
import com.revature.dungeonsite.repositories.GameBehaviorRepository;
import com.revature.dungeonsite.utils.KeyUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

//possibly change mapping later?
@RestController
@CrossOrigin
@RequestMapping("/api/game_behavior")
public class GameBehaviorController {
    private GameBehaviorRepository gbr;

    public GameBehaviorController(GameBehaviorRepository gr) {
        this.gbr = gr;
    }

	private GameBehavior getNeoGameBehavior(@PathVariable("id") Long ID) throws ResourceNotFoundException {
        return gbr.findById(ID)
                .orElseThrow(
                        () -> new ResourceNotFoundException("No Game_Behavior with ID: " + ID)
                );
    }

    @GetMapping
    public ResponseEntity<List<GameBehavior>> findAll() {
        return ResponseEntity.ok(this.gbr.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GameBehavior> findByID(@PathVariable(value="id") Long ID)
            throws ResourceNotFoundException {
        GameBehavior gameBehavior = getNeoGameBehavior(ID);
        return ResponseEntity.ok().body(gameBehavior);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GameBehavior> updateGameBehavior(@PathVariable(value = "id") Long ID,
        @RequestBody GameBehavior gameBehavior) throws ResourceNotFoundException {
        GameBehavior neoGameBehavior = getNeoGameBehavior(ID);
        if (gameBehavior.getGameID() != null)
            neoGameBehavior.setGameID(gameBehavior.getGameID());
        if (gameBehavior.getBehaviorID() != null)
            neoGameBehavior.setBehaviorID(gameBehavior.getBehaviorID());
        return ResponseEntity.ok(this.gbr.save(neoGameBehavior));
    }

    @PostMapping
    public GameBehavior makeGameBehavior(@RequestBody GameBehavior neoGameBehavior) {
		neoGameBehavior.setID(KeyUtils.nextKey());
        return this.gbr.save(neoGameBehavior);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteGameBehavior(@PathVariable(value = "id") Long ID)
            throws ResourceNotFoundException {
        GameBehavior oldGameBehavior = getNeoGameBehavior(ID);
        this.gbr.delete(oldGameBehavior);

        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
