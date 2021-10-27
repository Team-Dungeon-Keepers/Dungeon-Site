package com.revature.dungeonsite.models;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "yipyip")
public class YipMessage {
    @Id
    @Column(name="id")
    @Getter  @Setter
    private long id;

    @Column(name= "message")
    @Getter  @Setter
    private String message;

}
