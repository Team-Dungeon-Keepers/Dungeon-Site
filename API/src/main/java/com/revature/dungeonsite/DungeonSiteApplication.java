package com.revature.dungeonsite;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DungeonSiteApplication {

    public static void main(String[] args) {
        SpringApplication.run(DungeonSiteApplication.class, args);
        System.out.println("Seems to be working.");
    }

}
