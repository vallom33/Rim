package com.mauritania.houseshop.service;

import com.mauritania.houseshop.dto.HouseFilterDto;
import com.mauritania.houseshop.entity.House;
import com.mauritania.houseshop.repository.HouseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class HouseService {
    
    private final HouseRepository houseRepository;
    
    public List<House> getAllAvailableHouses() {
        return houseRepository.findByIsAvailableTrue();
    }
    
    public Optional<House> getHouseById(Long id) {
        return houseRepository.findById(id);
    }
    
    public House saveHouse(House house) {
        return houseRepository.save(house);
    }
    
    public void deleteHouse(Long id) {
        houseRepository.deleteById(id);
    }
    
    public List<House> filterHouses(HouseFilterDto filter) {
        return houseRepository.findHousesWithFilters(
            filter.getCity(),
            filter.getQuartier(),
            filter.getMinPrice(),
            filter.getMaxPrice(),
            filter.getHouseType(),
            filter.getMinBedrooms()
        );
    }
    
    public List<String> getAllCities() {
        return houseRepository.findAllCities();
    }
    
    public List<String> getAllQuartiers() {
        return houseRepository.findAllQuartiers();
    }
    
    public List<String> getAllHouseTypes() {
        return houseRepository.findAllHouseTypes();
    }
}
