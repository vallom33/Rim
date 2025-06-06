import { Component } from "@angular/core"
import  { LanguageService } from "../../services/language.service"

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.scss"],
})
export class AboutComponent {
  teamMembers = [
    {
      name: "Abdou jiddou",
      position: "Directeur Général",
      image: "assets/images/team/ceo.png",
      description: "15 ans d'expérience dans l'immobilier mauritanien",
    },
    {
      name: "Omar med vall",
      position: "Developper",
      image: "assets/images/team/dev.png",
      description: "Spécialiste en négociation et relation client",
    },
    {
      name: " Lemin",
      position: "Conseiller Immobilier",
      image: "assets/images/team/member3.jpg",
      description: "Expert du marché immobilier de Nouakchott",
    },
   
  ]

  constructor(private languageService: LanguageService) {}

  getTranslation(key: string): string {
    return this.languageService.getTranslation(key)
  }
}
