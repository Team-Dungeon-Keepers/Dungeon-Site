package com.revature.dungeonsite.controllers;

import com.revature.dungeonsite.exceptions.ResourceNotFoundException;
import com.revature.dungeonsite.models.Behavior;
import com.revature.dungeonsite.repositories.BehaviorRepository;
import com.revature.dungeonsite.utils.KeyUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/behavior")
public class BehaviorController {
    private final BehaviorRepository br;

    public BehaviorController(BehaviorRepository br) {
        this.br = br;
    }

    @GetMapping
    public List<Behavior> findAll() {
        return this.br.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Behavior> getUserByID(@PathVariable(value="id") Long behaviorID)
            throws ResourceNotFoundException {
        Behavior behavior = getNeoUser(behaviorID);
        return ResponseEntity.ok().body(behavior);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Behavior> updateUser(@PathVariable(value = "id") Long behaviorID,
                                               @RequestBody Behavior behavior) throws ResourceNotFoundException {
        Behavior neoBehavior = getNeoUser(behaviorID);
        if (behavior.getBehavior() != null && !behavior.getBehavior().equals(""))
            neoBehavior.setBehavior(behavior.getBehavior());

        return ResponseEntity.ok(this.br.save(neoBehavior));
    }

    private Behavior getNeoUser(@PathVariable("id") Long behaviorID) throws ResourceNotFoundException {
        return br.findById(behaviorID)
                .orElseThrow(
                        () -> new ResourceNotFoundException("User not found for ID: " + behaviorID)
                );
    }

    @PostMapping
    public Behavior makeUser(@RequestBody Behavior neoBehavior) {
        neoBehavior.setBehaviorID(KeyUtils.nextKey());
        return this.br.save(neoBehavior);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteUser(@PathVariable(value = "id") Long behaviorID)
            throws ResourceNotFoundException {
        Behavior oldUser = getNeoUser(behaviorID);
        this.br.delete(oldUser);

        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);

        return response;
    }

}
