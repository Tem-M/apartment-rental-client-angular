import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
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
        
    })
  }

  get getEmail() {
    return this.userForm.controls["email"]
  }

  get getPassword() {
    return this.userForm.controls["password"]
  }

  signUp() {
    if(!this.getEmail.invalid && !this.getPassword.invalid) {
      this.loading=true
      this.userS.signUp(this.userForm.value).subscribe(
        suc => {
          this.userS.currentUser = suc
          this.router.navigate(['/apartments']);
          this.loading=false
        },
        err => {
          console.log(err);
          alert(err.message)
          this.loading=false
        }
      )
    }
  }
}
