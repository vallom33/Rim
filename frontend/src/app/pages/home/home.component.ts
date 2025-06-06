import { Component, type OnInit } from "@angular/core"
import  { House } from "../../models/house.model"
import  { HouseService } from "../../services/house.service"
import  { LanguageService } from "../../services/language.service"

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  featuredHouses: House[] = []
  recentHouses: House[] = []
  loading = true

  // Services data
  services = [
    {
      icon: "search",
      title: "Recherche de propriétés",
      description: "Trouvez la propriété parfaite grâce à notre système de recherche avancé.",
    },
    {
      icon: "real_estate_agent",
      title: "Conseil immobilier",
      description: "Nos experts vous accompagnent dans toutes vos démarches immobilières.",
    },
    {
      icon: "handshake",
      title: "Négociation",
      description: "Nous négocions pour vous les meilleures conditions d'achat ou de vente.",
    },
    {
      icon: "gavel",
      title: "Assistance juridique",
      description: "Nous vous assistons dans tous les aspects juridiques de votre transaction.",
    },
  ]

  // Testimonials data
  testimonials = [
    {
      name: "Ahmed ",
      position: "Propriétaire",
      image: "assets/images/team/ceo.png",
      text: "Dari m'a aidé à trouver la maison de mes rêves à Nouakchott. Le processus était simple et transparent.",
    },
    {
      name: "Fatima ",
      position: "Investisseur",
      image: "assets/images/testimonials/person2.jpg",
      text: "J'ai investi dans plusieurs propriétés grâce à Dari. Leur expertise du marché mauritanien est inégalée.",
    },
  
  ]

  // Partners data
  partners = [
        { name: "Immobilier Global", logo: "assets/images/houses/logo.jpg" },
  ]

  constructor(
    private houseService: HouseService,
    private languageService: LanguageService,
  ) {}

  ngOnInit() {
    this.loadFeaturedHouses()
    this.loadRecentHouses()
  }

  loadFeaturedHouses() {
    this.houseService.getFeaturedHouses().subscribe({
      next: (houses) => {
        this.featuredHouses = houses
        this.loading = false
      },
      error: (error) => {
        console.error("Error loading featured houses:", error)
        this.loading = false

        // Fallback to sample data
        this.featuredHouses = this.getSampleHouses(3, true)
      },
    })
  }

  loadRecentHouses() {
    this.houseService.getRecentHouses().subscribe({
      next: (houses) => {
        this.recentHouses = houses
      },
      error: (error) => {
        console.error("Error loading recent houses:", error)

        // Fallback to sample data
        this.recentHouses = this.getSampleHouses(4)
      },
    })
  }

  // Helper method to generate sample houses for demo
  getSampleHouses(count: number, featured = false): House[] {
    const houses: House[] = []
    const cities = ["Nouakchott", "Nouadhibou", "Rosso", "Kaédi"]
    const quartiers = ["Tevragh Zeina", "Ksar", "Arafat", "Sebkha", "Centre"]
    const types = ["Villa", "Appartement", "Maison", "Studio", "Duplex"]

    for (let i = 0; i < count; i++) {
      const city = cities[Math.floor(Math.random() * cities.length)]
      const quartier = quartiers[Math.floor(Math.random() * quartiers.length)]
      const type = types[Math.floor(Math.random() * types.length)]

      houses.push({
        id: i + 1,
        title: `${type} ${featured ? "de Luxe" : "Moderne"} à ${city}`,
        description: `Magnifique ${type.toLowerCase()} ${featured ? "de luxe" : "moderne"} situé dans le quartier ${quartier} de ${city}. Parfait pour une famille.`,
        price: Math.floor(Math.random() * 30000000) + 10000000,
        city: city,
        quartier: quartier,
        bedrooms: Math.floor(Math.random() * 4) + 2,
        bathrooms: Math.floor(Math.random() * 3) + 1,
        areaSqm: Math.floor(Math.random() * 200) + 80,
        houseType: type,
        imageUrls: this.houseService.getSampleImages(Math.floor(Math.random() * 2) + 1),
        isAvailable: true,
        features: ["Jardin", "Piscine", "Garage", "Sécurité 24/7"].slice(0, Math.floor(Math.random() * 4) + 1),
      })
    }

    return houses
  }

  getTranslation(key: string): string {
    return this.languageService.getTranslation(key)
  }
}
