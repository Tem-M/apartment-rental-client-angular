import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from 'src/class/city';
import { CityService } from 'src/service/city.service';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent {
  hidden = true
  apt = false
  done = false
  newCity:FormGroup = new FormGroup({})
  constructor(public userS:UserService, public cityS:CityService, public router:Router) {}

  ngOnInit() {
    this.hidden = true
    this.apt = false
    this.done = false
    this.getCitiesWithApt()
    if(this.cityS.allCities.length === 0) {
      this.cityS.getAll().subscribe
      (
        suc => {
          this.cityS.allCities = suc
        },
        err => {
          alert("לא הצלחנו לטעון את הערים הקיימות")
        }
      )
    }
    this.restart()
  }

  hasApt(cityName: string) {
    if (this.cityS.citiesWithApt.some(city => city.name === cityName)) {
      return true;
    } else {
      return false;
    }
  }


  restart() {
    this.newCity = new FormGroup({
      "name": new FormControl(null, [Validators.required, Validators.pattern("[א-ת ]*")])
    })
  }

  get getName() {
    return this.newCity.controls["name"]
  }

  add() {
    if(!this.getName.invalid && this.userS.currentUser.isAdvertiser) {
      this.cityS.create(this.newCity.value)
      .subscribe(
        suc=>{
          this.cityS.allCities.push(suc)
          alert("העיר נוספה בהצלחה")
          this.hidden = true
          this.restart()
        },
        err => {
          console.log(err.message)
          alert("אופס, זה לא עבד...")
        }
      )
    }
  }

  getCitiesWithApt() {
    if(this.cityS.citiesWithApt.length == 0) {
      this.cityS.getCitiesWithApartments().subscribe(
        suc => {
          console.log(suc)
          this.cityS.citiesWithApt = suc
          this.done = true
        },
        err => {
          console.log(err)
          this.done = true
        }
      )
    }
    else {
      this.done = true
    }
  }

  filter(id:string) {
    console.log(id)
    this.router.navigate([`../apartments/${id}`])
  }
}
