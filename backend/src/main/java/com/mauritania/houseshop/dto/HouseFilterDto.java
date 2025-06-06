package com.mauritania.houseshop.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class HouseFilterDto {
    private String city;
    private String quartier;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
    private String houseType;
    private Integer minBedrooms;
}
