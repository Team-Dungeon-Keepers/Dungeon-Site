package com.revature.dungeonsite.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="addresses")
public class Address {
    @Id
    @Column(name="addressid")
    @Getter @Setter
    private Long addressID;

    @Column(name="street")
    @Getter  @Setter
    private String street;

    @Column(name="apartment")
    @Getter  @Setter
    private String apartment;

    @Column(name="city")
    @Getter  @Setter
    private String city;

    @Column(name="state")
    @Getter  @Setter
    private String state;

    @Column(name="zip")
    @Getter  @Setter
    private Long zip;

}
