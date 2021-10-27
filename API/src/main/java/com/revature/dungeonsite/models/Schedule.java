package com.revature.dungeonsite.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="schedule")
public class Schedule {
    @Id
    @Column(name="scheduleid")
    @Getter @Setter
    private Long scheduleID;

    @Column(name="starttime")
    @Getter  @Setter
    private String startTime;

    @Column(name="endtime")
    @Getter  @Setter
    private String endTime;

    @Column(name="startdate")
    @Getter  @Setter
    private String startDate;

    @Column(name="enddate")
    @Getter  @Setter
    private String endDate;
}
