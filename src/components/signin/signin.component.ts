import { getSafePropertyAccessString } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/class/User';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  loading = false;
  userForm:FormGroup = new FormGroup({})
  constructor(public router:Router, public userS:UserService) {

  }

  ngOnInit() {
    this.restart()
  }

  restart() {
    this.userForm = new FormGroup(
      {
        "email":new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]),
        "password": new FormControl(null, [Validators.required])
      } 
    )
  }

  get getEmail() {
    return this.userForm.controls["email"]
  }

  get getPassword() {
    return this.userForm.controls["password"]
  }

  login() {
    if(!this.getEmail.invalid && !this.getPassword.invalid) {
      this.loading=true;
      this.userS.login(this.userForm.value).subscribe(
        suc => {
          this.userS.currentUser = suc
          this.router.navigate(['/apartments']);
        },
        err => {
          alert('לא הצלחנו להתחבר, יכול להיות שאין לכם חשבון?')
          console.log(err)
          this.loading=false;
        }
      )
    }
    else {
      alert("אופס, נראה שחסר מידע")
      this.restart()
    }
  }
}
