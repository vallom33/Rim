import { Component, EventEmitter, Output } from "@angular/core"
import  { LanguageService } from "../../services/language.service"

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent {
  @Output() closeSidebar = new EventEmitter<void>()

  constructor(private languageService: LanguageService) {}

  onCloseSidebar() {
    this.closeSidebar.emit()
  }

  getTranslation(key: string): string {
    return this.languageService.getTranslation(key)
  }
}
