package com.revature.dungeonsite.controllers;

import com.revature.dungeonsite.exceptions.ResourceNotFoundException;
import com.revature.dungeonsite.models.Rules;
import com.revature.dungeonsite.repositories.RulesRepository;
import com.revature.dungeonsite.utils.KeyUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResourceAccessException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/rules")
public class RulesController {
    private final RulesRepository rules;

    public RulesController(RulesRepository rules) {
        this.rules = rules;
    }

    @GetMapping
    public List<Rules> findAll() {
        return this.rules.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rules> getUserByID(@PathVariable(value="id") Long rulesID)
            throws ResourceNotFoundException {
        Rules rule = getNeoRule(rulesID);
        return ResponseEntity.ok().body(rule);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Rules> updateUser(@PathVariable(value = "id") Long rulesID,
                                               @RequestBody Rules rule) throws ResourceNotFoundException {
        Rules neoRule = getNeoRule(rulesID);
        if (rule.getRulesName() != null && !rule.getRulesName().equals(""))
            neoRule.setRulesName(rule.getRulesName());

        return ResponseEntity.ok(this.rules.save(neoRule));
    }

    private Rules getNeoRule(@PathVariable("id") Long rulesID) throws ResourceNotFoundException {
        return rules.findById(rulesID)
                .orElseThrow(
                        () -> new ResourceAccessException("Rule not found for ID: " + rulesID)
                );
    }

    @PostMapping
    public Rules makeUser(@RequestBody Rules neoRule) {
        neoRule.setRulesid(KeyUtils.nextKey());
        return this.rules.save(neoRule);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteUser(@PathVariable(value = "id") Long rulesID)
            throws ResourceNotFoundException {
        Rules oldRule = getNeoRule(rulesID);
        this.rules.delete(oldRule);

        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);

        return response;
    }}
