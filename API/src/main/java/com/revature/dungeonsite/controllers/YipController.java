package com.revature.dungeonsite.controllers;

import com.revature.dungeonsite.models.YipMessage;
import com.revature.dungeonsite.repositories.YipRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/")
public class YipController {
    private final YipRepository yip;

    public YipController(YipRepository yip) {
        this.yip = yip;
    }

    @GetMapping("/")
    public List<YipMessage> yipFinder() {
        return this.yip.findAll();
    }
}
