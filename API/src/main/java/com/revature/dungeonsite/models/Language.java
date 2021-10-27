package com.revature.dungeonsite.models;

import javax.persistence.*;

import lombok.*;

@Entity
@Table(name="languages")
public class Language {

	@Id
	@Column(name="languageid")
	@Getter  @Setter
	private long languageid;
	
	@Column(name="language", nullable=false, unique=true)
	@Getter  @Setter
	private String language;
}
