import { Component } from '@angular/core';
import { UserService } from 'src/service/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  constructor(public userS:UserService){}

  logout() {
    
  }
}
