package com.revature.dungeonsite.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="user_links")
public class UserLink {
    @Id
	@Column(name="id")
    @Getter  @Setter
    private Long ID;
	
    @Column(name="userid")
    @Getter  @Setter
    private Long userID;
	
    @Column(name="linkid")
    @Getter @Setter
    private Long linkID;
}
