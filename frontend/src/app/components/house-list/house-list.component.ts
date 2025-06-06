import { Component, type OnInit } from "@angular/core"
import  { House, HouseFilter } from "../../models/house.model"
import  { HouseService } from "../../services/house.service"
import  { LanguageService } from "../../services/language.service"

@Component({
  selector: "app-house-list",
  templateUrl: "./house-list.component.html",
  styleUrls: ["./house-list.component.scss"],
})
export class HouseListComponent implements OnInit {
  houses: House[] = []
  filteredHouses: House[] = []
  loading = true
  error: string | null = null

  constructor(
    private houseService: HouseService,
    private languageService: LanguageService,
  ) {}

  ngOnInit() {
    this.loadHouses()
  }

  loadHouses() {
    this.loading = true
    this.houseService.getAllHouses().subscribe({
      next: (houses) => {
        this.houses = houses
        this.filteredHouses = houses
        this.loading = false
      },
      error: (error) => {
        this.error = "Erreur lors du chargement des maisons"
        this.loading = false
        console.error("Error loading houses:", error)
      },
    })
  }

  onFilterChange(filter: HouseFilter) {
    if (Object.keys(filter).length === 0) {
      this.filteredHouses = this.houses
      return
    }

    this.loading = true
    this.houseService.filterHouses(filter).subscribe({
      next: (houses) => {
        this.filteredHouses = houses
        this.loading = false
      },
      error: (error) => {
        this.error = "Erreur lors du filtrage"
        this.loading = false
        console.error("Error filtering houses:", error)
      },
    })
  }

  getTranslation(key: string): string {
    return this.languageService.getTranslation(key)
  }
}
