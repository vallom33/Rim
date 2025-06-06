import { Component, Input } from "@angular/core"
import  { House } from "../../models/house.model"
import  { LanguageService } from "../../services/language.service"

@Component({
  selector: "app-house-card",
  templateUrl: "./house-card.component.html",
  styleUrls: ["./house-card.component.scss"],
})
export class HouseCardComponent {
  @Input() house!: House
  @Input() featured = false

  constructor(private languageService: LanguageService) {}

  formatPrice(price: number): string {
    return new Intl.NumberFormat("fr-FR").format(price)
  }

  getTranslation(key: string): string {
    return this.languageService.getTranslation(key)
  }
}
