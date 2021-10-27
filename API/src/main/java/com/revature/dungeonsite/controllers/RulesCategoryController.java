package com.revature.dungeonsite.controllers;

import com.revature.dungeonsite.exceptions.ResourceNotFoundException;
import com.revature.dungeonsite.models.RulesCategory;
import com.revature.dungeonsite.repositories.RulesCategoryRepository;
import com.revature.dungeonsite.utils.KeyUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResourceAccessException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/rc")
public class RulesCategoryController {
    private final RulesCategoryRepository rc;

    public RulesCategoryController(RulesCategoryRepository rc) {
        this.rc = rc;
    }

    @GetMapping
    public List<RulesCategory> findAll() {
        return this.rc.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RulesCategory> getUserByID(@PathVariable(value="id") Long rcID)
            throws ResourceNotFoundException {
        RulesCategory rule = getNeoRule(rcID);
        return ResponseEntity.ok().body(rule);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RulesCategory> updateUser(@PathVariable(value = "id") Long rcID,
                                               @RequestBody RulesCategory rule) throws ResourceNotFoundException {
        RulesCategory neoRC = getNeoRule(rcID);
        if (rule.getRulesid() > 0)
            neoRC.setRulesid(rule.getRulesid());
        if (rule.getCategoryid() > 0)
            neoRC.setCategoryid(rule.getCategoryid());

        return ResponseEntity.ok(this.rc.save(neoRC));
    }

    private RulesCategory getNeoRule(@PathVariable("id") Long rcID) throws ResourceNotFoundException {
        return rc.findById(rcID)
                .orElseThrow(
                        () -> new ResourceAccessException("Rule not found for ID: " + rcID)
                );
    }

    @PostMapping
    public RulesCategory makeUser(@RequestBody RulesCategory neoRC) {
        neoRC.setId(KeyUtils.nextKey());
        return this.rc.save(neoRC);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteUser(@PathVariable(value = "id") Long rcID)
            throws ResourceNotFoundException {
        RulesCategory oldRule = getNeoRule(rcID);
        this.rc.delete(oldRule);

        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);

        return response;
    }}
