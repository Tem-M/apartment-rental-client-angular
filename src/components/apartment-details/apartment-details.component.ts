import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apartment } from 'src/class/apartment';
import { ApartmentService } from 'src/service/apartment.service';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-apartment-details',
  templateUrl: './apartment-details.component.html',
  styleUrls: ['./apartment-details.component.css']
})
export class ApartmentDetailsComponent {

  constructor(public userS:UserService, public apartmentService: ApartmentService, public router: Router, public activeRoute: ActivatedRoute) { }
  apartment: Apartment = new Apartment();
  hidden = true
  ngOnInit() {
    let id = ""
    this.activeRoute.params.subscribe(
      
      (p) => {
        id = p['id']
      }  
    )
  
    this.apartmentService.getById(id).subscribe(
      suc => {
        this.apartment = suc
        console.log(this.apartment)
      },
      err => {
        console.log(err)
      }
    )
    
  }

  delete() {
    if (window.confirm("האם אתם בטוחים? הפעולה אינה ניתנת לביטול!")) {
      this.apartmentService.delete(this.apartment._id!).
      subscribe(
        suc => {
          this.apartmentService.allApartments = this.apartmentService.allApartments.filter(a => a._id != suc._id)
          this.router.navigate(['/'])
        },
        err => {
          alert(err.message)
          console.log(err)
        }
      )
    }
  }

  ownsApartment() {
    return this.userS.currentUser._id === this.apartment.advertiser?._id
  }


  edit() {
    this.router.navigate([`edit/${this.apartment._id}`])
  }
}
