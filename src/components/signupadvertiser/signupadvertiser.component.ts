import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-signupadvertiser',
  templateUrl: './signupadvertiser.component.html',
  styleUrls: ['./signupadvertiser.component.css']
})
export class SignupadvertiserComponent {
  userForm:FormGroup = new FormGroup({})
  constructor(public router:Router, public userS:UserService) { }
  loading = false
  ngOnInit() {
    this.restart()
  }
  restart() {
    this.userForm = new FormGroup({
      
        "email":new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]),
        "password":new FormControl(null, [Validators.required]),
        "phone": new FormControl(null, [Validators.required, Validators.pattern(/^(?![ -])(?!.*[- ]$)(?!.*[- ]{2})[0-9- ]+$/)]),
        "phone2": new FormControl(null, [Validators.pattern(/^(?![ -])(?!.*[- ]$)(?!.*[- ]{2})[0-9- ]+$/)])
        
    })
  }

  get getEmail() {
    return this.userForm.controls["email"]
  }

  get getPassword() {
    return this.userForm.controls["password"]
  }

  get getPhone() {
    return this.userForm.controls["phone"]
  }

  get getPhone2() {
    return this.userForm.controls["phone2"]
  }

  signUp() {
      if(!this.getEmail.invalid && !this.getPassword.invalid && !this.getPhone.invalid && !this.getPhone2.invalid) {
        this.loading=true
        this.userS.signUpAdvertiser(this.userForm.value).subscribe(
          suc => {
            this.userS.currentUser = suc
            this.router.navigate(['/apartments']);
            this.loading = false
          },
          err => {
            alert(err.message)
            this.loading=false
          })
      } 
  }
}
