import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class APIService {

   private apiUrl = 'https://jsonplaceholder.typicode.com/users'; // Replace with your API URL
   
   private url="https://localhost:7234/api"
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
   //this function is used to redirect to the admin login page
  //use observable to get the admin login data
  adminLogin(admin:any){
    return this.http.post(this.url+"/Auth/login",admin);
  }
  //this function is used to add the product
  addProduct(product: FormData): Observable<any> {
    return this.http.post(this.url+"/Product/Add", product);
  }
}
