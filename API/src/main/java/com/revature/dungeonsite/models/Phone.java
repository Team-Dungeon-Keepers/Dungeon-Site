package com.revature.dungeonsite.models;

import javax.persistence.*;

import lombok.*;


@Entity
@Table(name="phones")
public class Phone {

	@Id
	@Column(name="phoneid")
	@Getter  @Setter
	private long phoneid;
	
	@Column(name="number", nullable=false, unique=true)
	@Getter  @Setter
	private long number;
	
	@Column(name="typeid", nullable=false)
	@Getter  @Setter
	private long typeid;
}
	