package com.revature.dungeonsite.controllers;

import com.revature.dungeonsite.exceptions.ResourceNotFoundException;
import com.revature.dungeonsite.models.Link;
import com.revature.dungeonsite.repositories.LinkRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin
@RequestMapping("/api/links")
public class LinkController {

	private final LinkRepository lr;

	public LinkController(LinkRepository lr) {
		this.lr = lr;
	}

	@GetMapping
	public ResponseEntity<List<Link>> findall() {
		return ResponseEntity.ok(lr.findAll());
	}

	private Link getNeoLink(@PathVariable("id") Long linkID) throws ResourceNotFoundException {
		return lr.findById(linkID)
				.orElseThrow(
						() -> new ResourceNotFoundException("Link not found for ID: " + linkID)
				);
	}

	@GetMapping("/{linkid}")
	public ResponseEntity<Link> findById(@PathVariable("linkid") long linkid) throws ResourceNotFoundException {
		return ResponseEntity.ok(getNeoLink(linkid));
	}
	
	@PutMapping
	public ResponseEntity<Link> update(@RequestBody Link link){
		if (link.getLinkid()==0) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok(link);
	}
	
	@PostMapping
	public ResponseEntity<Link> create(@RequestBody Link link){
		if (link.getLinkid()==0) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok(lr.save(link));
	}
	
	@DeleteMapping
	public ResponseEntity<Void> delete(@PathVariable("linkid") long linkid) throws ResourceNotFoundException {
		lr.delete(getNeoLink(linkid));
		
		return ResponseEntity.ok().build();
	}
}
