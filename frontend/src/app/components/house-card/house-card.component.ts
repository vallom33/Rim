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

  getImageUrl(): string {
    if (this.house && this.house.imageUrls && this.house.imageUrls.length > 0) {
      let url = this.house.imageUrls[0]
      // إذا المسار لا يبدأ بـ /، نضيف /
      if (!url.startsWith('/')) {
        url = '/' + url
      }
      return url
    }
    // صورة افتراضية إذا لم يكن هناك صورة
    return '/assets/images/default-house.jpg'
  }
}
