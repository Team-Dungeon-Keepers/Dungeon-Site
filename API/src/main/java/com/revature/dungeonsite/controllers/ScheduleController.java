package com.revature.dungeonsite.controllers;

import com.revature.dungeonsite.exceptions.ResourceNotFoundException;
import com.revature.dungeonsite.models.Schedule;
import com.revature.dungeonsite.repositories.ScheduleRepository;
import com.revature.dungeonsite.utils.KeyUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/schedules")
public class ScheduleController {
    private ScheduleRepository schedules;
	
    public ScheduleController(ScheduleRepository schedules) {
        this.schedules = schedules;
    }
	
    @GetMapping
    public ResponseEntity<List<Schedule>> findAll() {
        return ResponseEntity.ok(this.schedules.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Schedule> getScheduleByID(@PathVariable(value="id") Long scheduleID)
            throws ResourceNotFoundException {
        Schedule schedule = getNeoSchedule(scheduleID);
        return ResponseEntity.ok().body(schedule);
    }

    private Schedule getNeoSchedule(@PathVariable("id") Long scheduleID) throws ResourceNotFoundException {
        return schedules.findById(scheduleID)
                .orElseThrow(
                        () -> new ResourceNotFoundException("Schedule not found for ID: " + scheduleID)
                );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Schedule> updateSchedule(@PathVariable(value = "id") Long scheduleID,
        @RequestBody Schedule schedule) throws ResourceNotFoundException {
        Schedule neoSchedule = getNeoSchedule(scheduleID);
        if (schedule.getStartTime() != null)
            neoSchedule.setStartTime(schedule.getStartTime());
        if (schedule.getEndTime() != null)
            neoSchedule.setEndTime(schedule.getEndTime());
        if (schedule.getStartDate() != null)
            neoSchedule.setStartDate(schedule.getStartDate());
        if (schedule.getEndDate() != null)
            neoSchedule.setEndDate(schedule.getEndDate());
        return ResponseEntity.ok(this.schedules.save(neoSchedule));
    }

    @PostMapping
    public Schedule makeSchedule(@RequestBody Schedule neoSchedule) {
		neoSchedule.setScheduleID(KeyUtils.nextKey());
        return this.schedules.save(neoSchedule);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteSchedule(@PathVariable(value = "id") Long scheduleID)
            throws ResourceNotFoundException {
        Schedule oldSchedule = getNeoSchedule(scheduleID);
        this.schedules.delete(oldSchedule);

        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
