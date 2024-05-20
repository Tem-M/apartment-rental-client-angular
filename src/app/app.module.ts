import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApartmentComponent } from '../components/apartment/apartment.component';
import { NavComponent } from '../components/nav/nav.component';
import { AddApartmentComponent } from '../components/add-apartment/add-apartment.component';
import { ApartmentDetailsComponent } from '../components/apartment-details/apartment-details.component';
import { SignupComponent } from '../components/signup/signup.component';
import { SigninComponent } from '../components/signin/signin.component';
import { SignupadvertiserComponent } from '../components/signupadvertiser/signupadvertiser.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { CategoriesComponent } from '../components/categories/categories.component';
import { ImgPipe } from '../pipe/img.pipe';
import { CitiesComponent } from '../components/cities/cities.component';
import { EditComponent } from '../components/edit/edit.component';
import { NisPipe } from '../pipe/nis.pipe';
import { HomeComponent } from '../components/home/home.component';
import { MinDirective } from 'src/directive/min.directive';
import { MaxDirective } from 'src/directive/max.directive';
import { LoaderComponent } from '../components/loader/loader.component';



@NgModule({
  declarations: [
    AppComponent,
    ApartmentComponent,
    NavComponent,
    AddApartmentComponent,
    ApartmentDetailsComponent,
    SignupComponent,
    SigninComponent,
    SignupadvertiserComponent,
    ProfileComponent,
    CategoriesComponent,
    ImgPipe,
    CitiesComponent,
    EditComponent,
    NisPipe,
    HomeComponent,
    MinDirective,
    MaxDirective,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // כדי להשתמש במעבר דו כיווני 
    //FormsModule יש להוסיף את המודל
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
