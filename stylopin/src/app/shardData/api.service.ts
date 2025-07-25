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

  private url = "https://localhost:7234/api"
  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  //this function is used to redirect to the admin login page
  //use observable to get the admin login data
  adminLogin(admin: any) {
    return this.http.post(this.url + "/Auth/login", admin);
  }
  //this function is used to add the product
  addProduct(product: FormData): Observable<any> {
    return this.http.post(this.url + "/Product/Add", product);
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
  //this function is used to update the product
  //'https://localhost:7234/api/Product/update/5'
  updateProduct(product: FormData, id: number): Observable<any> {
    return this.http.put(`${this.url}/Product/update/${id}`, product);
  }
  //this function is used to get the product by id
  //+++++++++++++++++++++++++++++++++++++++++++++++
  //update -- banner Section
  //https://localhost:7234/api/Slider/add
  addBanner(data: any): Observable<any> {
    console.log("Adding banner with data:", data);
    return this.http.post(this.url + '/Slider/add', data);
  }
  // get all banners
  //https://localhost:7234/api/Slider/list
  getAllBanners(): Observable<any> {
    return this.http.get(this.url + '/Slider/list');
  }
  //delete banner
  //https://localhost:7234/api/Slider/delete/1
  deleteBanner(id: number): Observable<any> {
    return this.http.delete(`${this.url}/Slider/delete/${id}`);
  }
  //update banner
  //'https://localhost:7234/api/Slider/update/7'
  updateBanner(data: any, id: number): Observable<any> {
    return this.http.put(`${this.url}/Slider/update/${id}`, data);
  }
  //+++++++++++++++++++++++++++++++++++++++++++++++
  //update -- about Section
  //https://localhost:7234/api/AboutUs/add
  addAbout(data: any): Observable<any> {
    return this.http.post(this.url + '/AboutUs/add', data);
  }
  //get all about
  //'https://localhost:7234/api/AboutUs/list' 
  getAllAbout(): Observable<any> {
    return this.http.get(this.url + '/AboutUs/list');
  }
  //delete about
  //https://localhost:7234/api/AboutUs/delete/1
  deleteAbout(id: number): Observable<any> {
    return this.http.delete(`${this.url}/AboutUs/delete/${id}`);
  }
  //update about
  // 'https://localhost:7234/api/AboutUs/update/1
  updateAbout(data: any, id: number): Observable<any> {
    return this.http.put(`${this.url}/AboutUs/update/${id}`, data);
  }
  //+++++++++++++++++++++++++++++++++++++++++++++++
  //update -- contact Section
  //https://localhost:7234/api/ContactUs/create
  //'https://localhost:7234/api/ContactUs/create
  addContact(data: any): Observable<any> {
    return this.http.post(this.url + '/ContactUs/create', data);
  }
  //get all contact
  //https://localhost:7234/api/ContactUs/get-all
  getAllContact(): Observable<any> {
    return this.http.get(this.url + '/ContactUs/get-all');
  }
  //delete contact
  //https://localhost:7234/api/ContactUs/delete/1
  deleteContact(id: number): Observable<any> {
    return this.http.delete(`${this.url}/ContactUs/delete/${id}`);
  }

  //+++++++++++++++++++++++++++++++++
  //buyer section
  //https://localhost:7234/api/Order/GetAllOrders
  getAllOrders(): Observable<any> {
    return this.http.get(this.url + '/Order/GetAllOrders');
  }
  //delete order 
  // 'https://localhost:7234/api/Order/DeleteCustomer/1
  deleteOrder(id: number): Observable<any> {
    return this.http.delete(`${this.url}/Order/DeleteOrder/${id}`);
  }

  //add order
  //https://localhost:7234/api/Order/CreateOrder
  addOrder(order: any): Observable<any> {
    return this.http.post(this.url + '/Order/CreateOrder', order);
  }



}
