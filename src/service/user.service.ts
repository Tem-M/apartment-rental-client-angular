import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/class/User';
import { Apartment } from 'src/class/apartment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser:User = new User()
  constructor(public http:HttpClient) { }

  url:string = "http://localhost:3001/"

  login(u:User):Observable<User> {
    return this.http.post<User>(this.url+'signin', u)
  }

  signUp(u:Object):Observable<User> {
    return this.http.post<User>(this.url+"signup", u)
  }

  signUpAdvertiser(u:Object):Observable<User> {
    return this.http.post<User>(this.url + "advertiser/signup", u)
  }

}
