package com.mauritania.houseshop.controller;

import com.mauritania.houseshop.dto.HouseFilterDto;
import com.mauritania.houseshop.entity.House;
import com.mauritania.houseshop.service.HouseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/houses")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class HouseController {
    
    private final HouseService houseService;
    
    @GetMapping
    public ResponseEntity<List<House>> getAllHouses() {
        List<House> houses = houseService.getAllAvailableHouses();
        return ResponseEntity.ok(houses);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<House> getHouseById(@PathVariable Long id) {
        Optional<House> house = houseService.getHouseById(id);
        return house.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<House> createHouse(@RequestBody House house) {
        House savedHouse = houseService.saveHouse(house);
        return ResponseEntity.ok(savedHouse);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<House> updateHouse(@PathVariable Long id, @RequestBody House house) {
        house.setId(id);
        House updatedHouse = houseService.saveHouse(house);
        return ResponseEntity.ok(updatedHouse);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHouse(@PathVariable Long id) {
        houseService.deleteHouse(id);
        return ResponseEntity.noContent().build();
    }
    
    @PostMapping("/filter")
    public ResponseEntity<List<House>> filterHouses(@RequestBody HouseFilterDto filter) {
        List<House> filteredHouses = houseService.filterHouses(filter);
        return ResponseEntity.ok(filteredHouses);
    }
    
    @GetMapping("/cities")
    public ResponseEntity<List<String>> getAllCities() {
        List<String> cities = houseService.getAllCities();
        return ResponseEntity.ok(cities);
    }
    
    @GetMapping("/quartiers")
    public ResponseEntity<List<String>> getAllQuartiers() {
        List<String> quartiers = houseService.getAllQuartiers();
        return ResponseEntity.ok(quartiers);
    }
    
    @GetMapping("/types")
    public ResponseEntity<List<String>> getAllHouseTypes() {
        List<String> types = houseService.getAllHouseTypes();
        return ResponseEntity.ok(types);
    }
}
