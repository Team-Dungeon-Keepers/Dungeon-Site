package com.revature.dungeonsite.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="game_address")
@NoArgsConstructor  @AllArgsConstructor
public class GameAddress {
    @Id
	@Column(name="id")
    @Getter  @Setter
    private Long ID;
	
    @Column(name="gameid")
    @Getter  @Setter
    private Long gameID;
	
    @Column(name="addressid")
    @Getter @Setter
    private Long addressID;
}
