import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Apartment } from 'src/class/apartment';
import { ApartmentService } from 'src/service/apartment.service';
import { CategoryService } from 'src/service/category.service';
import { CityService } from 'src/service/city.service';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  
  apartment:Apartment = new Apartment();
  constructor(public activeRoute:ActivatedRoute, public cityS:CityService, public apartmentService:ApartmentService, public router:Router, public userS:UserService, public categoryS:CategoryService){}
  editApartment:FormGroup = new FormGroup({})
  selectedCity = ""
  selectedCategory = ""
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
    this.activeRoute.params.subscribe(
      (p) => {
        this.apartmentService.getById(p['id']).subscribe
        (
          suc => {
            this.apartment=suc
            this.selectedCategory = this.apartment.category!._id!;
            this.selectedCity = this.apartment.city?._id!;
          },
          err => {
            console.log(err)
          }
        )
      }  
    ) 
  }

  ownsApartment() {
    return this.userS.currentUser._id === this.apartment.advertiser?._id
  }

  fileChosen(event:Event){
    console.log("file chosen")
    
  }

  restart() {
    this.editApartment = new FormGroup(
      {
        "name":new FormControl(null, [Validators.pattern("[א-ת ]*")]),
        "address": new FormControl(null, [Validators.pattern("[א-ת a-zA-z 0-9 -',\"\.()]*")]),
        "numBeds": new FormControl(null, [Validators.min(1), Validators.max(50)]),
        "price": new FormControl(null, [Validators.min(100), Validators.max(5000)]),
        "description": new FormControl(null),
        "additions": new FormControl(null),
        "category": new FormControl(null),
        "city": new FormControl(null)
      } 
    )
  }

  get getName() {
    return this.editApartment.controls["name"]
  }
  get getDescription() {
    return this.editApartment.controls["description"]
  }
  get getAddress() {
    return this.editApartment.controls["address"]
  }
  get getNumBeds() {
    return this.editApartment.controls["numBeds"]
  }
  get getAdditions() {
    return this.editApartment.controls["additions"]
  }
  get getPrice() {
    return this.editApartment.controls["price"]
  }
  get getCategory() {
    return this.editApartment.controls["category"]
  }

  get getCity() {
    return this.editApartment.controls["city"]
  }

  
  async edit() {
    const img = (document.getElementById("files") as HTMLInputElement).files![0]
    if (!this.getName.invalid && !this.getAdditions.invalid 
      && !this.getDescription.invalid && !this.getNumBeds.invalid && !this.getPrice.invalid && 
      !this.getAddress.invalid && !this.getCategory.invalid && !this.getCity.invalid &&
       this.userS.currentUser.isAdvertiser){
        (await this.apartmentService.update({...this.editApartment.value, _id: this.apartment._id}, img)).subscribe(
          suc => {
            this.apartmentService.allApartments[this.apartmentService.allApartments.indexOf(this.apartment)] = suc
            this.userS.currentUser.apartments![this.userS.currentUser.apartments!.indexOf(this.apartment)] = suc
            alert("הדירה נערכה בהצלחה!") 
            this.router.navigate(['/'])
          },
          err => {
            alert("אופס, לא הצלחנו לערוך הדירה")
            console.log(err)
          }
        )
    }
    else {
      alert("אופס, נראה שיש בעיה עם המידע שהזנתם")
    }
  }
}
