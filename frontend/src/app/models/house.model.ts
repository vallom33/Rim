export interface House {
  id?: number
  title: string
  description: string
  price: number
  city: string
  quartier: string
  address?: string
  bedrooms: number
  bathrooms: number
  areaSqm: number
  houseType: string
  imageUrls: string[]
  isAvailable: boolean
  createdAt?: string
  updatedAt?: string
  features?: string[]
}

export interface HouseFilter {
  city?: string
  quartier?: string
  minPrice?: number
  maxPrice?: number
  houseType?: string
  minBedrooms?: number
}
