package com.revature.dungeonsite.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="rules_category")
public class RulesCategory {
    @Id
    @Getter  @Setter
    @Column(name="id")
    private long id;

    @Column(name="rulesid")
    @Getter  @Setter
    private long rulesid;

    @Column(name="categoryid")
    @Getter  @Setter
    private long categoryid;


}
