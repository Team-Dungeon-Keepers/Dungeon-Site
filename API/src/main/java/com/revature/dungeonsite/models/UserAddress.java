package com.revature.dungeonsite.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="user_address")
@NoArgsConstructor  @AllArgsConstructor
public class UserAddress {
    @Id
	@Column(name="id")
    @Getter  @Setter
    private Long ID;
	
    @Column(name="userid")
    @Getter  @Setter
    private Long userID;
	
    @Column(name="addressid")
    @Getter @Setter
    private Long addressID;
}
