package com.revature.dungeonsite.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="user_language")
public class UserLanguage {
    @Id
	@Column(name="id")
    @Getter  @Setter
    private Long ID;
	
    @Column(name="userid")
    @Getter  @Setter
    private Long userID;
	
    @Column(name="languageid")
    @Getter @Setter
    private Long languageID;
}
