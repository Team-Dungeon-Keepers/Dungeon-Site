package com.revature.dungeonsite.controllers;

import com.revature.dungeonsite.exceptions.ResourceNotFoundException;
import com.revature.dungeonsite.models.Category;
import com.revature.dungeonsite.repositories.CategoryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin
@RequestMapping("/api/category")
public class CategoryController {

	private final CategoryRepository cr;

	public CategoryController(CategoryRepository crn) {
		this.cr = crn;
	}

	@GetMapping
	public ResponseEntity<List<Category>> findall() {
		return ResponseEntity.ok(cr.findAll());
	}

	private Category getNeoCategory(@PathVariable("id") Long categoryID) throws ResourceNotFoundException {
		return cr.findById(categoryID)
				.orElseThrow(
						() -> new ResourceNotFoundException("Category not found for ID: " + categoryID)
				);
	}

	@GetMapping("/{categoryid}")
	public ResponseEntity<Category> findById(@PathVariable("categoryid") long categoryid) throws ResourceNotFoundException {
		return ResponseEntity.ok(getNeoCategory(categoryid));
	}
	
	@PutMapping
	public ResponseEntity<Category> update(@RequestBody Category category){
		if (category.getCategoryID()==0) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok(category);
	}
	
	@PostMapping
	public ResponseEntity<Category> create(@RequestBody Category category){
		if (category.getCategoryID()==0) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok(cr.save(category));
	}
	
	@DeleteMapping
	public ResponseEntity<Void> delete(@PathVariable("categoryid") long categoryid) throws ResourceNotFoundException {
		cr.delete(getNeoCategory(categoryid));
		
		return ResponseEntity.ok().build();
	}
}
