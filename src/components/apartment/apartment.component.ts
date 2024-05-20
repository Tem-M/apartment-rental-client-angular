import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Apartment } from 'src/class/apartment';
import { ApartmentService } from 'src/service/apartment.service';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.css']
})
export class ApartmentComponent {
  constructor(public apartmentS:ApartmentService, public router:Router, public userS:UserService){}
  @Input() apartments:Array<Apartment> = new Array<Apartment>()
  ngOnInit(){
    this.apartmentS.getAll().subscribe(
      all=>{
        this.apartmentS.allApartments=all
      },
      err=>{
        console.log(err);   
      }
    )
  }
  public details(_id:String) {[]
    this.router.navigate([`details/${_id}`])
  }
}
