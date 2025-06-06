import { Component, EventEmitter, Output } from "@angular/core"
import  { LanguageService, Language } from "../../services/language.service"

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>()

  currentLanguage: Language = "fr"
  isScrolled = false

  constructor(private languageService: LanguageService) {
    this.languageService.currentLanguage$.subscribe((lang) => {
      this.currentLanguage = lang
    })

    window.addEventListener("scroll", this.checkScroll.bind(this))
  }

  ngOnDestroy() {
    window.removeEventListener("scroll", this.checkScroll.bind(this))
  }

  checkScroll() {
    this.isScrolled = window.scrollY > 50
  }

  onToggleSidebar() {
    this.toggleSidebar.emit()
  }

  switchLanguage(language: Language) {
    this.languageService.setLanguage(language)
  }

  getTranslation(key: string): string {
    return this.languageService.getTranslation(key)
  }
}
