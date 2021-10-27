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
@Table(name="game_schedule")
@NoArgsConstructor  @AllArgsConstructor
public class GameSchedule {
    @Id
	@Column(name="id")
    @Getter  @Setter
    private Long ID;
	
    @Column(name="gameid")
    @Getter  @Setter
    private Long gameID;
	
    @Column(name="scheduleid")
    @Getter @Setter
    private Long scheduleID;
}
