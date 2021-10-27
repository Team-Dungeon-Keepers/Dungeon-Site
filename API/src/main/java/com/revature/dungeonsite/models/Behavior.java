package com.revature.dungeonsite.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="behavior")
public class Behavior {
    @Id
    @Column(name="behaviorid")
    @Getter  @Setter
    private long behaviorID;

    @Column(name="behavior")
    @Getter  @Setter
    private String behavior;
}
