package com.revature.dungeonsite.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="phone_types")
public class PhoneType {
    @Id
    @Getter  @Setter
    @Column(name="typeid")
    private long typeID;

    @Column(name="type")
    @Getter  @Setter
    private String type;


}
