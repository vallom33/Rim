import { NgModule } from "@angular/core"
import { RouterModule, type Routes } from "@angular/router"
import { HomeComponent } from "./pages/home/home.component"
import { HouseListComponent } from "./components/house-list/house-list.component"
import { HouseDetailComponent } from "./components/house-detail/house-detail.component"
import { AboutComponent } from "./pages/about/about.component"

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "houses", component: HouseListComponent },
  { path: "house/:id", component: HouseDetailComponent },
  { path: "about", component: AboutComponent },
  { path: "**", redirectTo: "/" },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
