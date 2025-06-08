import { Injectable } from "@angular/core"
import  { HttpClient } from "@angular/common/http"
import  { Observable } from "rxjs"
import  { House, HouseFilter } from "../models/house.model"

@Injectable({
  providedIn: "root",
})
export class HouseService {
  private apiUrl = "https://rim-lzyj.onrender.com/api/houses"

  // Sample image URLs for houses (replace with your actual image URLs)
  private sampleImages = [
    "/assets/houses/1.jpeg",
    "/assets/houses/2.jpeg",
    "/assets/houses/3.jpeg",
    "/assets/houses/logo.jpg",
    "/assets/houses/2.jpeg",
    "/assets/houses/1.jpeg",
  ]

  constructor(private http: HttpClient) {}

  getAllHouses(): Observable<House[]> {
    return this.http.get<House[]>(this.apiUrl)
  }

  getHouseById(id: number): Observable<House> {
    return this.http.get<House>(`${this.apiUrl}/${id}`)
  }

  filterHouses(filter: HouseFilter): Observable<House[]> {
    return this.http.post<House[]>(`${this.apiUrl}/filter`, filter)
  }

  getAllCities(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/cities`)
  }

  getAllQuartiers(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/quartiers`)
  }

  getAllHouseTypes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/types`)
  }

  createHouse(house: House): Observable<House> {
    return this.http.post<House>(this.apiUrl, house)
  }

  updateHouse(id: number, house: House): Observable<House> {
    return this.http.put<House>(`${this.apiUrl}/${id}`, house)
  }

  deleteHouse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }

  // Helper method to get sample images
  getSampleImages(count = 1): string[] {
    const result = []
    for (let i = 0; i < count; i++) {
      result.push(this.sampleImages[Math.floor(Math.random() * this.sampleImages.length)])
    }
    return result
  }

  // Get featured houses for homepage
  getFeaturedHouses(): Observable<House[]> {
    return this.http.get<House[]>(`${this.apiUrl}?featured=true`)
  }

  // Get recent houses
  getRecentHouses(): Observable<House[]> {
    return this.http.get<House[]>(`${this.apiUrl}?sort=createdAt,desc&size=4`)
  }
}
