package com.revature.dungeonsite.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="category")
public class Category {

	@Id
	@Column(name="categoryid")
	@Getter  @Setter
	private long categoryID;
	
	@Column(name="name", nullable=false, unique=true)
	@Getter  @Setter
	private String name;

}
