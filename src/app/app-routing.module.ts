import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddApartmentComponent } from 'src/components/add-apartment/add-apartment.component';
import { ApartmentDetailsComponent } from 'src/components/apartment-details/apartment-details.component';
import { ApartmentComponent } from 'src/components/apartment/apartment.component';
import { CategoriesComponent } from 'src/components/categories/categories.component';
import { CitiesComponent } from 'src/components/cities/cities.component';
import { EditComponent } from 'src/components/edit/edit.component';
import { HomeComponent } from 'src/components/home/home.component';
import { NavComponent } from 'src/components/nav/nav.component';
import { ProfileComponent } from 'src/components/profile/profile.component';
import { SigninComponent } from 'src/components/signin/signin.component';
import { SignupComponent } from 'src/components/signup/signup.component';
import { SignupadvertiserComponent } from 'src/components/signupadvertiser/signupadvertiser.component';
import { ApartmentService } from 'src/service/apartment.service';

const routes: Routes = [
  {path: "", component:HomeComponent},
  {path:"apartments", component:HomeComponent},
  {path:"apartments/:city", component:HomeComponent},
  {path:"new", component:AddApartmentComponent},
  {path:"details/:id", component:ApartmentDetailsComponent},
  {path:"signup", component:SignupComponent},
  {path:"signin", component:SigninComponent},
  {path:"register", component:SignupadvertiserComponent},
  {path:"profile", component:ProfileComponent},
  {path:"category", component:CategoriesComponent},
  {path:"city", component:CitiesComponent},
  {path:"edit/:id", component:EditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
