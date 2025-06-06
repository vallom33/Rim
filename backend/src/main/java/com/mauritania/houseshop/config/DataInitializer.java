package com.mauritania.houseshop.config;

import com.mauritania.houseshop.entity.House;
import com.mauritania.houseshop.repository.HouseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    
    private final HouseRepository houseRepository;
    
    @Override
    public void run(String... args) throws Exception {
        if (houseRepository.count() == 0) {
            initializeHouses();
        }
    }
    
    private void initializeHouses() {
        List<House> houses = Arrays.asList(
            createHouse("Villa Moderne à Nouakchott", "Belle villa moderne avec jardin", 
                       new BigDecimal("25000000"), "Nouakchott", "Tevragh Zeina", 
                       "Villa", 4, 3, 250.0,
                       Arrays.asList("assets/houses/1.jpeg")),
            
            createHouse("Appartement Centre-ville", "Appartement spacieux au centre", 
                       new BigDecimal("15000000"), "Nouakchott", "Ksar", 
                       "Appartement", 3, 2, 120.0,
                       Arrays.asList("assets/houses/2.jpeg")),
            
            createHouse("Maison Familiale Nouadhibou", "Grande maison pour famille", 
                       new BigDecimal("18000000"), "Nouadhibou", "Centre", 
                       "Maison", 5, 3, 200.0,
                       Arrays.asList("assets/houses/3.jpeg")),
            
            createHouse("Studio Moderne", "Studio équipé proche université", 
                       new BigDecimal("8000000"), "Nouakchott", "Sebkha", 
                       "Studio", 1, 1, 45.0,
                       Arrays.asList("assets/houses/1.jpeg")),
            
            createHouse("Villa de Luxe Bord de Mer", "Villa luxueuse avec vue mer", 
                       new BigDecimal("45000000"), "Nouadhibou", "Bord de Mer", 
                       "Villa", 6, 4, 350.0,
                       Arrays.asList("assets/houses/2.jpeg", "assets/houses/logo.jpg", "assets/houses/3.jpeg")),
            
            createHouse("Appartement Économique", "Appartement abordable bien situé", 
                       new BigDecimal("12000000"), "Rosso", "Centre", 
                       "Appartement", 2, 1, 80.0,
                       Arrays.asList("assets/houses/logo.jpg")),
            
            createHouse("Maison Traditionnelle", "Maison traditionnelle rénovée", 
                       new BigDecimal("20000000"), "Kaédi", "Ancien Quartier", 
                       "Maison", 4, 2, 180.0,
                       Arrays.asList("assets/houses/1.jpeg", "assets/houses/3.jpeg")),
            
            createHouse("Duplex Moderne", "Duplex avec terrasse", 
                       new BigDecimal("22000000"), "Nouakchott", "Arafat", 
                       "Duplex", 3, 2, 140.0,
                       Arrays.asList("assets/houses/2.jpeg", "assets/houses/logo.jpg"))
        );
        
        houseRepository.saveAll(houses);
    }
    
    private House createHouse(String title, String description, BigDecimal price, 
                             String city, String quartier, String type, 
                             int bedrooms, int bathrooms, double area, List<String> images) {
        House house = new House();
        house.setTitle(title);
        house.setDescription(description);
        house.setPrice(price);
        house.setCity(city);
        house.setQuartier(quartier);
        house.setHouseType(type);
        house.setBedrooms(bedrooms);
        house.setBathrooms(bathrooms);
        house.setAreaSqm(area);
        house.setImageUrls(images);
        house.setIsAvailable(true);
        house.setAddress(quartier + ", " + city);
        return house;
    }
}
