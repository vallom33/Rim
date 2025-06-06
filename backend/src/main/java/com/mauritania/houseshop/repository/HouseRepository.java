package com.mauritania.houseshop.repository;

import com.mauritania.houseshop.entity.House;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface HouseRepository extends JpaRepository<House, Long> {
    
    List<House> findByIsAvailableTrue();
    
    List<House> findByCityIgnoreCase(String city);
    
    List<House> findByQuartierIgnoreCase(String quartier);
    
    List<House> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);
    
    List<House> findByHouseTypeIgnoreCase(String houseType);
    
    @Query("SELECT h FROM House h WHERE " +
           "(:city IS NULL OR LOWER(h.city) LIKE LOWER(CONCAT('%', :city, '%'))) AND " +
           "(:quartier IS NULL OR LOWER(h.quartier) LIKE LOWER(CONCAT('%', :quartier, '%'))) AND " +
           "(:minPrice IS NULL OR h.price >= :minPrice) AND " +
           "(:maxPrice IS NULL OR h.price <= :maxPrice) AND " +
           "(:houseType IS NULL OR LOWER(h.houseType) LIKE LOWER(CONCAT('%', :houseType, '%'))) AND " +
           "(:minBedrooms IS NULL OR h.bedrooms >= :minBedrooms) AND " +
           "h.isAvailable = true")
    List<House> findHousesWithFilters(
        @Param("city") String city,
        @Param("quartier") String quartier,
        @Param("minPrice") BigDecimal minPrice,
        @Param("maxPrice") BigDecimal maxPrice,
        @Param("houseType") String houseType,
        @Param("minBedrooms") Integer minBedrooms
    );
    
    @Query("SELECT DISTINCT h.city FROM House h WHERE h.isAvailable = true ORDER BY h.city")
    List<String> findAllCities();
    
    @Query("SELECT DISTINCT h.quartier FROM House h WHERE h.isAvailable = true ORDER BY h.quartier")
    List<String> findAllQuartiers();
    
    @Query("SELECT DISTINCT h.houseType FROM House h WHERE h.isAvailable = true ORDER BY h.houseType")
    List<String> findAllHouseTypes();
}
