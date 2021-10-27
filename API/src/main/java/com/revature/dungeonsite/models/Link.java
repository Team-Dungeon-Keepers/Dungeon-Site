package com.revature.dungeonsite.models;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="links")
public class Link {

	@Id
	@Getter  @Setter
	private long linkid;
	
	@Column(name="url", nullable=false, unique=true)
	@Getter  @Setter
	private String url;

	@Column(name="description")
	@Getter  @Setter
	private String description;
}
