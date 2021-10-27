package com.revature.dungeonsite.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="games")
public class Game {
    @Id
    @Column(name="gameid")
    @Getter @Setter
    private Long gameID;

    @Column(name="gamemasterid")
    @Getter @Setter
	private Long gameMasterID;
    
	@Column(name="gamename", unique = true)
    @Getter  @Setter
    private String gameName;

    @Column(name="gamepassword")
    @Getter  @Setter
    private String gamePassword;

    @Column(name="rulesid")
    @Getter  @Setter
    private Long rulesID;

    @Column(name="description")
    @Getter  @Setter
    private String description;
}
