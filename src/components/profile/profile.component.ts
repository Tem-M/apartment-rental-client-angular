import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/class/User';
import { Apartment } from 'src/class/apartment';
import { Category } from 'src/class/category';
import { City } from 'src/class/city';
import { ApartmentService } from 'src/service/apartment.service';
import { CategoryService } from 'src/service/category.service';
import { CityService } from 'src/service/city.service';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
    constructor(public apartmentS:ApartmentService, public userS:UserService, public router:Router, public categoryS:CategoryService, public cityS:CityService){}

    ngOnInit() {
      if(this.userS.currentUser.apartments!.length == 0) {
        this.apartmentS.getApartmentsAdvertiser().subscribe(
          suc => {
            this.userS.currentUser.apartments = suc
          },
          err => {
            console.log(err)
          }
        )
      }
        
      
      console.log(this.userS.currentUser)
     }

    details(_id:String) {
      this.router.navigate([`details/${_id}`])
    }

    logout() {
      if (window.confirm('האם אתם בטוחים?')) {
        this.userS.currentUser = new User()
        this.apartmentS.allApartments = new Array<Apartment>()
        this.apartmentS.filteredApartments = new Array<Apartment>()
        this.cityS.allCities = new Array<City>()
        this.cityS.citiesWithApt = new Array<City>()
        this.categoryS.allCategories = new Array<Category>
        this.router.navigate(['/'])
      }
    } 
}
