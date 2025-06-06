import { Component, type OnInit } from "@angular/core"
import  { ActivatedRoute, Router } from "@angular/router"
import  { House } from "../../models/house.model"
import  { HouseService } from "../../services/house.service"
import  { LanguageService } from "../../services/language.service"

@Component({
  selector: "app-house-detail",
  templateUrl: "./house-detail.component.html",
  styleUrls: ["./house-detail.component.scss"],
})
export class HouseDetailComponent implements OnInit {
  house: House | null = null
  loading = true
  error: string | null = null
  currentImageIndex = 0

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private houseService: HouseService,
    private languageService: LanguageService,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id")
    if (id) {
      this.loadHouse(Number(id))
    }
  }

  loadHouse(id: number) {
    this.loading = true
    this.houseService.getHouseById(id).subscribe({
      next: (house) => {
        this.house = house
        this.loading = false
      },
      error: (error) => {
        this.error = "Maison non trouvée"
        this.loading = false
        console.error("Error loading house:", error)
      },
    })
  }

  nextImage() {
    if (this.house && this.house.imageUrls.length > 1) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.house.imageUrls.length
    }
  }

  previousImage() {
    if (this.house && this.house.imageUrls.length > 1) {
      this.currentImageIndex =
        this.currentImageIndex === 0 ? this.house.imageUrls.length - 1 : this.currentImageIndex - 1
    }
  }

  goBack() {
    this.router.navigate(["/houses"])
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat("fr-FR").format(price)
  }

  getTranslation(key: string): string {
    return this.languageService.getTranslation(key)
  }
}
