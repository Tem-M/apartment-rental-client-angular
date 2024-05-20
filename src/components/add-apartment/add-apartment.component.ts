import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apartment } from 'src/class/apartment';
import { ApartmentService } from 'src/service/apartment.service';
import { CategoryService } from 'src/service/category.service';
import { CityService } from 'src/service/city.service';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-add-apartment',
  templateUrl: './add-apartment.component.html',
  styleUrls: ['./add-apartment.component.css']
})
export class AddApartmentComponent {
  selectedCategory =''
  selectedCity = ''
  images = new Array<File>();
  constructor(public cityS:CityService, public apartmentService:ApartmentService, public router:Router, public userS:UserService, public categoryS:CategoryService){}
  addApartment:FormGroup = new FormGroup({})
  ngOnInit() {
    this.restart()
    if(this.categoryS.allCategories.length == 0) {
      console.log("trying to load categories")
      this.categoryS.getAll().subscribe(
        suc => {
          this.categoryS.allCategories = suc
          console.log(this.categoryS.allCategories)
        },
        err => {
          console.log(err)
        }
      )
    }
    if(this.cityS.allCities.length == 0) {
      console.log("trying to load categories")
      this.cityS.getAll().subscribe(
        suc => {
          this.cityS.allCities = suc
          console.log(this.cityS.allCities)
        },
        err => {
          console.log(err)
        }
      )
    }
  }

  fileChosen(event:Event){
    console.log("file chosen")
    
  }

  restart() {
    this.addApartment = new FormGroup(
      {
        "name":new FormControl(null, [Validators.required, Validators.pattern("[א-ת ]*")]),
        "address": new FormControl(null, [Validators.pattern("[א-ת a-zA-z 0-9 -',\"\.()]*")]),
        "numBeds": new FormControl(null, [Validators.required, Validators.min(1), Validators.max(50)]),
        "price": new FormControl(null, [Validators.required, Validators.min(100), Validators.max(5000)]),
        "description": new FormControl(null),
        "additions": new FormControl(null),
        "category": new FormControl(null, [Validators.required]),
        "city": new FormControl(null, [Validators.required])
      } 
    )
  }

  get getName() {
    return this.addApartment.controls["name"]
  }
  get getDescription() {
    return this.addApartment.controls["description"]
  }
  get getAddress() {
    return this.addApartment.controls["address"]
  }
  get getNumBeds() {
    return this.addApartment.controls["numBeds"]
  }
  get getAdditions() {
    return this.addApartment.controls["additions"]
  }
  get getPrice() {
    return this.addApartment.controls["price"]
  }
  get getCategory() {
    return this.addApartment.controls["category"]
  }

  get getCity() {
    return this.addApartment.controls["city"]
  }

  
  async add() {
    const img = (document.getElementById("files") as HTMLInputElement).files![0]
    
    console.log(this.images)
    if (!this.getName.invalid && !this.getAdditions.invalid 
      && !this.getDescription.invalid && !this.getNumBeds.invalid && !this.getPrice.invalid && 
      !this.getAddress.invalid && !this.getCategory.invalid && !this.getCity.invalid &&
       this.userS.currentUser.isAdvertiser){
        (await this.apartmentService.create(this.addApartment.value, img)).subscribe(
          suc => {
            console.log(suc)
            this.apartmentService.allApartments.push(suc)
            this.userS.currentUser.apartments!.push(suc)
            alert("הדירה נוספה בהצלחה!") 
            this.router.navigate(['/'])
            this.cityS.getCitiesWithApartments().subscribe(
              suc => {
                this.cityS.citiesWithApt = suc
              },
              err => {
                console.log(err)
              }
            )
          },
          err => {
            alert("אופס, לא הצלחנו להוסיף את הדירה")
            console.log(err)
            this.images = Array<File>();
          }
        )
    }
    else {
      alert("אופס, נראה שיש בעיה עם המידע שהזנתם")
      this.images = Array<File>();
    }
  }
}
