import { Injectable } from '@angular/core';
import { Apartment } from 'src/class/apartment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { City } from 'src/class/city';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {
  allApartments: Array<Apartment> = new Array<Apartment>()
  filteredApartments: Array<Apartment> = new Array<Apartment>()
  img: String = ''
  constructor(public http: HttpClient, public userS: UserService) { }
  url: string = "http://localhost:3001/apartment/"

  getAll(): Observable<Array<Apartment>> {
    return this.http.get<Array<Apartment>>(this.url);
  }

  getById(id: String): Observable<Apartment> {
    const headers = new HttpHeaders({ 'authorization': 'Bearer ' + this.userS.currentUser.token });
    return this.http.get<Apartment>(this.url + `${id}`, { headers: headers })
  }

  

  create(p: Apartment, f: File): Observable<Apartment> {

    const formData = new FormData();
    const { address, numBeds, price, name, description, additions, advertiser, category, city } = p
    formData.append("address", String(address))
    formData.append("numBeds", String(numBeds))
    formData.append("price", String(price))
    formData.append("name", String(name))
    formData.append("description", String(description))
    formData.append("additions", String(additions))
    formData.append("advertiser", String(advertiser))
    formData.append("category", String(category))
    formData.append("city", String(city))
    formData.append("userId", String(this.userS.currentUser._id))
    formData.append('file', f)
    
    const headers = new HttpHeaders({ 'authorization': 'Bearer ' + this.userS.currentUser.token, 'enctype': 'multipart/form-data' });
    return this.http.post<Apartment>(this.url, formData, { headers: headers })

  }

  delete(id: String): Observable<Apartment> {
    const headers = new HttpHeaders({ 'authorization': 'Bearer ' + this.userS.currentUser.token });
    return this.http.delete<Apartment>(this.url + `${id}/${this.userS.currentUser._id}`, { headers: headers })
  }

  update(p: Apartment, f: File): Observable<Apartment> {
    const formData = new FormData();
    const { address, numBeds, price, name, description, additions, advertiser, category, city } = p
    if(address)
      formData.append("address", String(address))
    if(numBeds)
      formData.append("numBeds", String(numBeds))
    if(price)
      formData.append("price", String(price))
    if(name)
      formData.append("name", String(name))
    if(description)
      formData.append("description", String(description))
    if(additions)
      formData.append("additions", String(additions))
    if(advertiser)
      formData.append("advertiser", String(advertiser))
    if(category)
      formData.append("category", String(category))
    if(city)
      formData.append("city", String(city))
    formData.append("userId", String(this.userS.currentUser._id))
    if(f)
      formData.append('file', f)
    
    const headers = new HttpHeaders({ 'authorization': 'Bearer ' + this.userS.currentUser.token, 'enctype': 'multipart/form-data' });
    return this.http.patch<Apartment>(this.url+p._id, formData, { headers: headers })
  }

  getApartmentsAdvertiser():Observable<Array<Apartment>> {
    return this.http.get<Array<Apartment>>(this.url + "adv/" + this.userS.currentUser._id);
  }

  getByCity(city:String):Observable<Array<Apartment>> {
    const headers = new HttpHeaders({ 'authorization': 'Bearer ' + this.userS.currentUser.token });
    return this.http.get<Array<Apartment>>(this.url +  `city/${city}`, {headers:headers})
  }

  getByCategory(category:String):Observable<Array<Apartment>> {
    const headers = new HttpHeaders({ 'authorization': 'Bearer ' + this.userS.currentUser.token });
    return this.http.get<Array<Apartment>>(this.url +  `category/${category}`, {headers:headers})
  }

  getByPriceRange(min:Number, max:Number):Observable<Array<Apartment>> {
    const headers = new HttpHeaders({ 'authorization': 'Bearer ' + this.userS.currentUser.token });
    return this.http.get<Array<Apartment>>(this.url +  `price/${min}/${max}`, {headers:headers})
  }

  getByNumBeds(beds:Number):Observable<Array<Apartment>> {
    const headers = new HttpHeaders({ 'authorization': 'Bearer ' + this.userS.currentUser.token });
    return this.http.get<Array<Apartment>>(this.url +  `beds/${beds}`, {headers:headers})
  }

  
}
