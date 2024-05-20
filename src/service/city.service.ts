import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { City } from 'src/class/city';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  citiesWithApt:Array<City> = []
  allCities:Array<City> = []
  constructor(public http:HttpClient, public userS:UserService) {}
  url:string = "http://localhost:3001/cities/"

  getAll():Observable<Array<City>> {
    const headers = new HttpHeaders({'authorization':'Bearer '+ this.userS.currentUser.token});
    return this.http.get<Array<City>>(this.url, {headers:headers});
  }

  create(c:City):Observable<City> {
    const headers = new HttpHeaders({'authorization':'Bearer '+ this.userS.currentUser.token});
    return this.http.post<City>(this.url, {...c, userId:this.userS.currentUser._id} , {headers:headers});
  }

  getCitiesWithApartments():Observable<Array<City>> {
    const headers = new HttpHeaders({ 'authorization': 'Bearer ' + this.userS.currentUser.token });
    return this.http.get<Array<City>>(this.url +  `apt`, {headers:headers})
  }

}
