import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apartment } from 'src/class/apartment';
import { ApartmentService } from 'src/service/apartment.service';
import { CategoryService } from 'src/service/category.service';
import { CityService } from 'src/service/city.service';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public activeRoute:ActivatedRoute, public apartmentS: ApartmentService, public cityS: CityService, public categoryS: CategoryService, public userS: UserService) { }
  
  filtering = false
  selectedCategory = ""
  selectedCity = ""
  minCurrency = null
  maxCurrency = null
  bedsCount = null
  results = true
  ngOnInit() {
    this.apartmentS.filteredApartments = new Array<Apartment>()
    if (this.apartmentS.allApartments.length == 0) {
      this.apartmentS.getAll().subscribe(
        all => {
          this.apartmentS.allApartments = all
        },
        err => {
          console.log(err);
        }
      )
    }
    if (this.userS.currentUser.email) {
      if (this.categoryS.allCategories.length == 0) {
        console.log("trying to load categories")
        this.categoryS.getAll().subscribe(
          suc => {
            this.categoryS.allCategories = suc
          },
          err => {
            console.log(err)
          }
        )
      }
      if (this.cityS.allCities.length == 0) {
        console.log("trying to load categories")
        this.cityS.getAll().subscribe(
          suc => {
            this.cityS.allCities = suc
          },
          err => {
            console.log(err)
          }
        )
      }
    }

    this.activeRoute.params.subscribe(
      suc => {
        if(suc['city']) 
          this.selectedCity = suc['city']
          this.city()
      },
      err => {
        console.log(err)
      }
    )
  }

  min() {
    return this.minCurrency ? this.minCurrency : 100
  }

  max() {
    return this.maxCurrency ? this.maxCurrency : 5000
  }

  city() {
    this.filtering=true
    this.selectedCategory = ""
    this.minCurrency = null
    this.maxCurrency = null
    this.bedsCount = null
    this.results = true
    this.apartmentS.getByCity(this.selectedCity).subscribe(
      suc => {
        this.apartmentS.filteredApartments = suc
        if (this.apartmentS.filteredApartments.length == 0)
          this.results = false
        else
          this.results = true
        this.filtering = false
      },
      err => {
        console.log(err)
        this.filtering = false
      }
    )
    
  }

  category() {
    this.filtering = true
    this.results = true
    this.selectedCity = ""
    this.minCurrency = null
    this.maxCurrency = null
    this.bedsCount = null

    this.apartmentS.getByCategory(this.selectedCategory).subscribe(
      suc => {
        this.apartmentS.filteredApartments = suc
        if (this.apartmentS.filteredApartments.length == 0)
          this.results = false
        else
          this.results = true
        this.filtering = false
      },
      err => {
        console.log(err)
        this.filtering = false
      }
    )
  }

  price() {
    this.filtering = true
    this.results = true
    this.selectedCategory = ""
    this.selectedCity = ""
    this.bedsCount = null

    this.apartmentS.getByPriceRange(this.minCurrency!, this.maxCurrency!).subscribe(
      suc => {
        this.apartmentS.filteredApartments = suc
        if (this.apartmentS.filteredApartments.length == 0)
          this.results = false
        else
          this.results = true
          this.filtering = false
      },
      err => {
        console.log(err)
        this.filtering = false
      }
    )
  }

  beds() {
    this.filtering = true
    this.results = true
    this.selectedCity = ""
    this.minCurrency = null
    this.maxCurrency = null
    this.selectedCategory = ""

    this.apartmentS.getByNumBeds(this.bedsCount!).subscribe(
      suc => {
        this.apartmentS.filteredApartments = suc
        if (this.apartmentS.filteredApartments.length == 0)
          this.results = false
        else
          this.results = true
          this.filtering = false
      },
      err => {
        console.log(err)
        this.filtering = false
      }
    )
  }

  restart() {
    this.results = true
    this.selectedCategory = ""
    this.selectedCity = ""
    this.minCurrency = null
    this.maxCurrency = null
    this.apartmentS.filteredApartments = new Array<Apartment>();
  }

}
