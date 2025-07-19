import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Product {
  pId: number;
  categoryName: string;
  pName: string;
  status: boolean;
  description: string;
  imageData: string;      // base64 string representation of byte[]
  imageName: string;      // original filename
  price: number;
  productQuantity: number;
}
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
  //https://localhost:7234/api/Product/list
  getAllProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url + '/Product/list');
  }
  //this function is used to delete the product
 // https://localhost:7234/api/Product/remove/
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.url}/Product/remove/${id}`);
  }
  
}
