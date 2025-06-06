import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"

export type Language = "ar" | "fr"

@Injectable({
  providedIn: "root",
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<Language>("fr")
  public currentLanguage$ = this.currentLanguageSubject.asObservable()

  private translations: { [lang in Language]: { [key: string]: string } } = {
    fr: {},
    ar: {},
  }

  constructor() {
    const savedLanguage = localStorage.getItem("language") as Language
    this.setLanguage(savedLanguage || "fr")
    this.initTranslations() // تحميل الترجمات عند بدء الخدمة
  }

  setLanguage(language: Language) {
    this.currentLanguageSubject.next(language)
    localStorage.setItem("language", language)
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = language
  }

  getCurrentLanguage(): Language {
    return this.currentLanguageSubject.value
  }

  getTranslation(key: string): string {
    const lang = this.getCurrentLanguage()
    return this.translations[lang][key] || key
  }

  private initTranslations() {
    this.translations.fr = {
      // === GLOBAL ===
      "app.title": "Dari - Immobilier Mauritanie",
      "app.slogan": "Trouvez votre maison de rêve en Mauritanie",
      "currency": "MRU",
      "sqm": "m²",

      // === NAV ===
      "nav.home": "Accueil",
      "nav.houses": "Propriétés",
      "nav.about": "À propos",
      "nav.contact": "Contact",
      "nav.services": "Services",

      // === FILTER ===
      "filter.title": "Filtres",
      "filter.city": "Ville",
      "filter.quartier": "Quartier",
      "filter.price": "Prix",
      "filter.minPrice": "Prix minimum",
      "filter.maxPrice": "Prix maximum",
      "filter.houseType": "Type de propriété",
      "filter.bedrooms": "Chambres",
      "filter.apply": "Appliquer",
      "filter.clear": "Effacer",

      // === HOUSE ===
      "house.bedrooms": "Chambres",
      "house.bathrooms": "Salles de bain",
      "house.area": "Surface",
      "house.price": "Prix",
      "house.viewDetails": "Voir détails",
      "house.noHouses": "Aucune propriété trouvée",

      // === HOME ===
      "home.welcome": "Bienvenue sur Dari",
      "home.subtitle": "Votre partenaire immobilier de confiance en Mauritanie",
      "home.search": "Rechercher une propriété",
      "home.featured": "Propriétés en vedette",
      "home.recent": "Ajouts récents",
      "home.viewAll": "Voir toutes les propriétés",
      "home.services": "Nos services",
      "home.testimonials": "Témoignages",
      "home.partners": "Nos partenaires",
      "home.cta": "Prêt à trouver votre maison de rêve?",
      "home.ctaButton": "Parcourir les propriétés",

      // === ABOUT ===
      "about.title": "À propos de Dari",
      "about.subtitle": "Votre partenaire immobilier de confiance en Mauritanie",
      "about.mission": "Notre mission",
      "about.mission.p1": "Chez Dari, notre mission est de révolutionner le marché immobilier mauritanien...",
      "about.mission.p2": "Nous croyons que chaque mauritanien mérite d'avoir accès à un logement de qualité...",
      "about.vision": "Notre vision",
      "about.vision.p1": "Notre vision est de devenir la référence incontournable de l'immobilier...",
      "about.vision.p2": "D'ici 2030, nous voulons faciliter l'acquisition de plus de 10 000 propriétés...",
      "about.valuesTitle": "Nos valeurs",
      "about.valuesSubtitle": "Les principes qui guident notre action quotidienne",
      "about.value1.title": "Transparence",
      "about.value1.desc": "Nous croyons en la transparence totale...",
      "about.value2.title": "Excellence",
      "about.value2.desc": "Nous nous efforçons d'offrir un service d'excellence...",
      "about.value3.title": "Confiance",
      "about.value3.desc": "La confiance est la base de toutes nos relations...",
      "about.value4.title": "Innovation",
      "about.value4.desc": "Nous innovons constamment pour améliorer l'expérience...",
      "about.team": "Notre équipe",
      "about.teamSubtitle": "Rencontrez les experts qui font la différence",
      "about.stat1": "Propriétés vendues",
      "about.stat2": "Clients satisfaits",
      "about.stat3": "Villes couvertes",
      "about.stat4": "Années d'expérience",

      // === CONTACT ===
      "contact.title": "Contactez-nous",
      "contact.subtitle": "Nous sommes là pour vous aider",
      "contact.form.name": "Nom",
      "contact.form.email": "Email",
      "contact.form.message": "Message",
      "contact.form.submit": "Envoyer",
      "contact.address": "Adresse",
      "contact.phone": "Téléphone",
      "contact.email": "Email",

      // === SERVICES ===
      "services.title": "Nos services",
      "services.subtitle": "Des solutions immobilières complètes",

      // === FOOTER ===
      "footer.rights": "Tous droits réservés",
      "footer.privacy": "Politique de confidentialité",
      "footer.terms": "Conditions d'utilisation",
    }

    this.translations.ar = {
      "app.title": "داري - العقارات في موريتانيا",
      "app.slogan": "ابحث عن منزل أحلامك في موريتانيا",
      "currency": "أوقية",
      "sqm": "م²",

      "nav.home": "الرئيسية",
      "nav.houses": "العقارات",
      "nav.about": "من نحن",
      "nav.contact": "اتصل بنا",
      "nav.services": "خدماتنا",

      "filter.title": "المرشحات",
      "filter.city": "المدينة",
      "filter.quartier": "الحي",
      "filter.price": "السعر",
      "filter.minPrice": "أقل سعر",
      "filter.maxPrice": "أعلى سعر",
      "filter.houseType": "نوع العقار",
      "filter.bedrooms": "غرف النوم",
      "filter.apply": "تطبيق",
      "filter.clear": "مسح",

      "house.bedrooms": "غرف النوم",
      "house.bathrooms": "الحمامات",
      "house.area": "المساحة",
      "house.price": "السعر",
      "house.viewDetails": "عرض التفاصيل",
      "house.noHouses": "لم يتم العثور على عقارات",

      "home.welcome": "مرحبًا بكم في داري",
      "home.subtitle": "شريكك العقاري الموثوق في موريتانيا",
      "home.search": "البحث عن عقار",
      "home.featured": "عقارات مميزة",
      "home.recent": "إضافات حديثة",
      "home.viewAll": "عرض جميع العقارات",
      "home.services": "خدماتنا",
      "home.testimonials": "آراء العملاء",
      "home.partners": "شركاؤنا",
      "home.cta": "هل أنت مستعد للعثور على منزل أحلامك؟",
      "home.ctaButton": "تصفح العقارات",

      "about.title": "عن داري",
      "about.subtitle": "شريكك العقاري الموثوق في موريتانيا",
      "about.mission": "مهمتنا",
      "about.mission.p1": "في داري، مهمتنا هي إحداث ثورة في سوق العقارات الموريتاني...",
      "about.mission.p2": "نؤمن أن كل موريتاني يستحق سكناً ذا جودة...",
      "about.vision": "رؤيتنا",
      "about.vision.p1": "رؤيتنا هي أن نصبح المرجع الأساسي في مجال العقارات...",
      "about.vision.p2": "بحلول عام 2030، نهدف إلى تسهيل اقتناء أكثر من 10,000 عقار...",
      "about.valuesTitle": "قيمنا",
      "about.valuesSubtitle": "المبادئ التي توجه أعمالنا اليومية",
      "about.value1.title": "الشفافية",
      "about.value1.desc": "نؤمن بالشفافية الكاملة...",
      "about.value2.title": "التميّز",
      "about.value2.desc": "نسعى جاهدين لتقديم خدمة متميزة...",
      "about.value3.title": "الثقة",
      "about.value3.desc": "الثقة هي أساس علاقاتنا...",
      "about.value4.title": "الابتكار",
      "about.value4.desc": "نبتكر باستمرار لتحسين تجربة العقارات...",
      "about.team": "فريقنا",
      "about.teamSubtitle": "تعرف على الخبراء الذين يصنعون الفرق",
      "about.stat1": "عقار تم بيعه",
      "about.stat2": "عميل راضٍ",
      "about.stat3": "مدينة مغطاة",
      "about.stat4": "سنوات من الخبرة",

      "contact.title": "اتصل بنا",
      "contact.subtitle": "نحن هنا لمساعدتك",
      "contact.form.name": "الاسم",
      "contact.form.email": "البريد الإلكتروني",
      "contact.form.message": "الرسالة",
      "contact.form.submit": "إرسال",
      "contact.address": "العنوان",
      "contact.phone": "الهاتف",
      "contact.email": "البريد الإلكتروني",

      "services.title": "خدماتنا",
      "services.subtitle": "حلول عقارية شاملة",

      "footer.rights": "جميع الحقوق محفوظة",
      "footer.privacy": "سياسة الخصوصية",
      "footer.terms": "شروط الاستخدام",
    }
  }
}
