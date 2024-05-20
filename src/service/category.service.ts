import { Injectable } from '@angular/core';
import { Category } from 'src/class/category';
import { UserService } from './user.service';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  allCategories:Array<Category>=new Array<Category>()
  constructor(public http:HttpClient, public userS:UserService) {}
  url:string = "http://localhost:3001/categories/"

  getAll():Observable<Array<Category>>{
    const headers = new HttpHeaders({'authorization':'Bearer '+ this.userS.currentUser.token});
    return this.http.get<Array<Category>>(this.url, {headers: headers});
  }

  create(p:Category):Observable<Category>{
    const headers = new HttpHeaders({'authorization':'Bearer '+ this.userS.currentUser.token});
    return this.http.post<Category>(this.url, {...p, userId:this.userS.currentUser._id}, {headers: headers})
  }
}
