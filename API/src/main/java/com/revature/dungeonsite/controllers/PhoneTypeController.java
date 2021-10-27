package com.revature.dungeonsite.controllers;

import com.revature.dungeonsite.exceptions.ResourceNotFoundException;
import com.revature.dungeonsite.models.PhoneType;
import com.revature.dungeonsite.repositories.PhoneTypeRepository;
import com.revature.dungeonsite.utils.KeyUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResourceAccessException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/phonetype")
public class PhoneTypeController {
    private final PhoneTypeRepository pt;

    public PhoneTypeController(PhoneTypeRepository pt) {
        this.pt = pt;
    }

    @GetMapping
    public List<PhoneType> findAll() {
        return this.pt.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PhoneType> getUserByID(@PathVariable(value="id") Long ptID)
            throws ResourceNotFoundException {
        PhoneType pt = getNeoRule(ptID);
        return ResponseEntity.ok().body(pt);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PhoneType> updateUser(@PathVariable(value = "id") Long ptID,
                                               @RequestBody PhoneType pt) throws ResourceNotFoundException {
        PhoneType neoPT = getNeoRule(ptID);
        if (pt.getType() != null && !pt.getType().equals(""))
            neoPT.setType(pt.getType());

        return ResponseEntity.ok(this.pt.save(neoPT));
    }

    private PhoneType getNeoRule(@PathVariable("id") Long ptID) throws ResourceNotFoundException {
        return pt.findById(ptID)
                .orElseThrow(
                        () -> new ResourceAccessException("Rule not found for ID: " + ptID)
                );
    }

    @PostMapping
    public PhoneType makeUser(@RequestBody PhoneType neoPT) {
        neoPT.setTypeID(KeyUtils.nextKey());
        return this.pt.save(neoPT);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteUser(@PathVariable(value = "id") Long ptID)
            throws ResourceNotFoundException {
        PhoneType oldRule = getNeoRule(ptID);
        this.pt.delete(oldRule);

        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);

        return response;
    }}
