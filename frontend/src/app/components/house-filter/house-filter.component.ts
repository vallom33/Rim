import { Component, EventEmitter, type OnInit, Output } from "@angular/core"
import  { FormBuilder, FormGroup } from "@angular/forms"
import  { HouseService } from "../../services/house.service"
import  { LanguageService } from "../../services/language.service"
import  { HouseFilter } from "../../models/house.model"

@Component({
  selector: "app-house-filter",
  templateUrl: "./house-filter.component.html",
  styleUrls: ["./house-filter.component.scss"],
})
export class HouseFilterComponent implements OnInit {
  @Output() filterChange = new EventEmitter<HouseFilter>()

  filterForm: FormGroup
  cities: string[] = []
  quartiers: string[] = []
  houseTypes: string[] = []

  constructor(
    private fb: FormBuilder,
    private houseService: HouseService,
    private languageService: LanguageService,
  ) {
    this.filterForm = this.fb.group({
      city: [""],
      quartier: [""],
      minPrice: [""],
      maxPrice: [""],
      houseType: [""],
      minBedrooms: [""],
    })
  }

  ngOnInit() {
    this.loadFilterOptions()
    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilter()
    })
  }

  loadFilterOptions() {
    this.houseService.getAllCities().subscribe((cities) => {
      this.cities = cities
    })

    this.houseService.getAllQuartiers().subscribe((quartiers) => {
      this.quartiers = quartiers
    })

    this.houseService.getAllHouseTypes().subscribe((types) => {
      this.houseTypes = types
    })
  }

  applyFilter() {
    const formValue = this.filterForm.value
    const filter: HouseFilter = {}

    if (formValue.city) filter.city = formValue.city
    if (formValue.quartier) filter.quartier = formValue.quartier
    if (formValue.minPrice) filter.minPrice = Number(formValue.minPrice)
    if (formValue.maxPrice) filter.maxPrice = Number(formValue.maxPrice)
    if (formValue.houseType) filter.houseType = formValue.houseType
    if (formValue.minBedrooms) filter.minBedrooms = Number(formValue.minBedrooms)

    this.filterChange.emit(filter)
  }

  clearFilter() {
    this.filterForm.reset()
    this.filterChange.emit({})
  }

  getTranslation(key: string): string {
    return this.languageService.getTranslation(key)
  }
}
