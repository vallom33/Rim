import { Component } from "@angular/core"
import  { LanguageService } from "../../services/language.service"

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent {
  currentYear = new Date().getFullYear()

  constructor(private languageService: LanguageService) {}

  getTranslation(key: string): string {
    return this.languageService.getTranslation(key)
  }
}
