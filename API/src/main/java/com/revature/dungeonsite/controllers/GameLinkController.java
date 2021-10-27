package com.revature.dungeonsite.controllers;

import com.revature.dungeonsite.exceptions.ResourceNotFoundException;
import com.revature.dungeonsite.models.GameLink;
import com.revature.dungeonsite.repositories.GameLinkRepository;
import com.revature.dungeonsite.utils.KeyUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/game_link")
public class GameLinkController {
    private GameLinkRepository glr;

    public GameLinkController(GameLinkRepository gr) {
        this.glr = gr;
    }

	private GameLink getNeoGameLink(@PathVariable("id") Long ID) throws ResourceNotFoundException {
        return glr.findById(ID)
                .orElseThrow(
                        () -> new ResourceNotFoundException("No Game_Language with ID: " + ID)
                );
    }

    @GetMapping
    public ResponseEntity<List<GameLink>> findAll() {
        return ResponseEntity.ok(this.glr.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GameLink> findByID(@PathVariable(value="id") Long ID)
            throws ResourceNotFoundException {
        GameLink gameBehavior = getNeoGameLink(ID);
        return ResponseEntity.ok().body(gameBehavior);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GameLink> updateGameLink(@PathVariable(value = "id") Long ID,
        @RequestBody GameLink gameBehavior) throws ResourceNotFoundException {
        GameLink neoGameLink = getNeoGameLink(ID);
        if (gameBehavior.getGameID() != null)
            neoGameLink.setGameID(gameBehavior.getGameID());
        if (gameBehavior.getLinkID() != null)
            neoGameLink.setLinkID(gameBehavior.getLinkID());
        return ResponseEntity.ok(this.glr.save(neoGameLink));
    }

    @PostMapping
    public GameLink makeGameLink(@RequestBody GameLink neoGameLink) {
		neoGameLink.setID(KeyUtils.nextKey());
        return this.glr.save(neoGameLink);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteGameLink(@PathVariable(value = "id") Long ID)
            throws ResourceNotFoundException {
        GameLink oldGameLink = getNeoGameLink(ID);
        this.glr.delete(oldGameLink);

        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
