package com.revature.dungeonsite.controllers;

import com.revature.dungeonsite.exceptions.ResourceNotFoundException;
import com.revature.dungeonsite.models.GameSchedule;
import com.revature.dungeonsite.repositories.GameScheduleRepository;
import com.revature.dungeonsite.utils.KeyUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/game_schedule")
public class GameScheduleController {
    private GameScheduleRepository gsr;

    public GameScheduleController(GameScheduleRepository gr) {
        this.gsr = gr;
    }

	private GameSchedule getNeoGameSchedule(@PathVariable("id") Long ID) throws ResourceNotFoundException {
        return gsr.findById(ID)
                .orElseThrow(
                        () -> new ResourceNotFoundException("No GameScheduleguage with ID: " + ID)
                );
    }

    @GetMapping
    public ResponseEntity<List<GameSchedule>> findAll() {
        return ResponseEntity.ok(this.gsr.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GameSchedule> findByID(@PathVariable(value="id") Long ID)
            throws ResourceNotFoundException {
        GameSchedule gameSchedule = getNeoGameSchedule(ID);
        return ResponseEntity.ok().body(gameSchedule);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GameSchedule> updateGameSchedule(@PathVariable(value = "id") Long ID,
        @RequestBody GameSchedule gameSchedule) throws ResourceNotFoundException {
        GameSchedule neoGameSchedule = getNeoGameSchedule(ID);
        if (gameSchedule.getGameID() != null)
            neoGameSchedule.setGameID(neoGameSchedule.getGameID());
        if (gameSchedule.getScheduleID() != null)
            neoGameSchedule.setScheduleID(gameSchedule.getScheduleID());
        return ResponseEntity.ok(this.gsr.save(neoGameSchedule));
    }

    @PostMapping
    public GameSchedule makeGameSchedule(@RequestBody GameSchedule neoGameSchedule) {
		neoGameSchedule.setID(KeyUtils.nextKey());
        return this.gsr.save(neoGameSchedule);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteGameSchedule(@PathVariable(value = "id") Long ID)
            throws ResourceNotFoundException {
        GameSchedule oldGameSchedule = getNeoGameSchedule(ID);
        this.gsr.delete(oldGameSchedule);

        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
