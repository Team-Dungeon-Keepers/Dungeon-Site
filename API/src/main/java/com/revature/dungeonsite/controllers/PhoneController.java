package com.revature.dungeonsite.controllers;

import java.util.List;
import java.util.Optional;

import com.revature.dungeonsite.exceptions.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.revature.dungeonsite.models.Phone;
import com.revature.dungeonsite.repositories.PhoneRepository;


@RestController
@CrossOrigin
@RequestMapping("/api/phone")
public class PhoneController {
	private final PhoneRepository pr;

	public PhoneController(PhoneRepository pr) {
		this.pr = pr;
	}

	@GetMapping
	public ResponseEntity<List<Phone>> findall() {
		return ResponseEntity.ok(pr.findAll());
	}

	private Phone getNeoPhone(@PathVariable("id") Long phoneID) throws ResourceNotFoundException {
		return pr.findById(phoneID)
				.orElseThrow(
						() -> new ResourceNotFoundException("User not found for ID: " + phoneID)
				);
	}

	@GetMapping("/{phoneid}")
	public ResponseEntity<Phone> findById(@PathVariable("phoneid") long phoneid) throws ResourceNotFoundException {
		return ResponseEntity.ok(getNeoPhone(phoneid));
	}
	
	@PutMapping
	public ResponseEntity<Phone> update(@RequestBody Phone phone){
		if (phone.getPhoneid()==0) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok(pr.save(phone));
	}
	
	@GetMapping("/number/{number}")
	public ResponseEntity<Phone> findByNumber(@PathVariable("number") long number){
		
		Optional<Phone> optional = pr.findByNumber(number);
		
		if(optional.isPresent()) {
			return ResponseEntity.ok(optional.get());
		}
		
		return ResponseEntity.noContent().build();
	}
	
	@PostMapping
	public ResponseEntity<Phone> create(@RequestBody Phone phone){
		if (phone.getPhoneid()==0) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok(pr.save(phone));
	}
	
	@DeleteMapping
	public ResponseEntity<Void> delete(@PathVariable("phoneid") long phoneid) throws ResourceNotFoundException {
		Phone deleteMe = getNeoPhone(phoneid);
		pr.delete(deleteMe);
		return ResponseEntity.ok().build();
	}
}
