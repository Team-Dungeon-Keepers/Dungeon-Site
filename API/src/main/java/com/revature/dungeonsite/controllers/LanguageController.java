package com.revature.dungeonsite.controllers;

import java.util.List;

import com.revature.dungeonsite.exceptions.ResourceNotFoundException;
import com.revature.dungeonsite.repositories.LanguageRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.revature.dungeonsite.models.Language;


@RestController
@CrossOrigin
@RequestMapping("/api/language")
public class LanguageController {

	private final LanguageRepository lr;

	public LanguageController(LanguageRepository lr) {
		this.lr = lr;
	}

	@GetMapping
	public ResponseEntity<List<Language>> findall() {
		return ResponseEntity.ok(lr.findAll());
	}

	private Language getNeoLang(@PathVariable("id") Long langID) throws ResourceNotFoundException {
		return lr.findById(langID)
				.orElseThrow(
						() -> new ResourceNotFoundException("Language not found for ID: " + langID)
				);
	}

	@GetMapping("/{languageid}")
	public ResponseEntity<Language> findById(@PathVariable("languageid")
		 long languageid) throws ResourceNotFoundException {
		return ResponseEntity.ok(getNeoLang(languageid));
	}
	
	@PutMapping
	public ResponseEntity<Language> update(@RequestBody Language language){
		if (language.getLanguageid()==0) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok(language);
	}
	
	@PostMapping
	public ResponseEntity<Language> create(@RequestBody Language language){
		if (language.getLanguageid()==0) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok(lr.save(language));
	}
	
	@DeleteMapping
	public ResponseEntity<Void> delete(@PathVariable("languageid") long languageid) throws ResourceNotFoundException {
		lr.delete(getNeoLang(languageid));
		
		return ResponseEntity.ok().build();
	}
}
