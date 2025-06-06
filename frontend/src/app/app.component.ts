import { Component, type OnInit } from "@angular/core"
import  { LanguageService } from "./services/language.service"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "mauritania-house-shop"
  sidebarOpen = false

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    // Initialize language service
    this.languageService.getCurrentLanguage()
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen
  }

  closeSidebar() {
    this.sidebarOpen = false
  }
}
