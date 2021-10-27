package com.revature.dungeonsite.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="rules")
public class Rules {
    @Id
    @Getter  @Setter
    @Column(name="rulesid")
    private long rulesid;

    @Column(name="rulesname")
    @Getter  @Setter
    private String rulesName;


}
