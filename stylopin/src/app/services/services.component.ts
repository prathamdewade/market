import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit
} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIService } from '../shardData/api.service';
import { MatDialog } from '@angular/material/dialog';

import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { LoaderComponent } from '../loader/loader.component';
@Component({
  selector: 'app-services',
  imports: [ReactiveFormsModule, CommonModule, LoaderComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit {

  isLoading = false;
  singleProduct: any = 0
  orderform: FormGroup;
  product: any;

  paymentStatusOptions = [
    'Pending',
    'Processing',
    'Paid',
    'Failed',
    'Refunded',
    'Cancelled',
    'PartiallyPaid',
    'Overpaid'
  ];

  constructor(private fb: FormBuilder, private apiService: APIService, private dialog: MatDialog) {
    this.orderform = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      number: ['', Validators.required],
      numberofitem: ['', Validators.required],
      address: ['', Validators.required],
      message: ['', Validators.required],
      productID: ['4', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllProducts(); // Fetch products on component initialization
  }

  //fetch products from the API
  getAllProducts() {
    this.isLoading = true; // Start loading
    this.apiService.getAllProduct().subscribe(
      (data: any) => {
        this.product = data.data;
        // console.log('Products fetched successfully:', data);
        var message = "Products fetched successfully";
        var type = "success";
        this.dialog.open(MessageDialogComponent, {
          data: { message, type },
          // width: '300px'
        });
      },
      (error) => {
        // console.error('Error fetching products:', error);
        var message = "Error fetching products";
        var type = "error";
        this.dialog.open(MessageDialogComponent, {
          data: { message, type },
          // width: '300px'
        });
      },
      () => {
        this.isLoading = false; // Stop loading
      }
    );
  }


  calculateTotalPrice(): number {
    const quantity = this.orderform.get('numberofitem')?.value || 0;
    return this.singleProduct.price * quantity;
  }

  submit() {
    if (this.orderform.invalid) {
      this.orderform.markAllAsTouched(); // 👈 Force show validation errors
      return;
    }
    const formValues = this.orderform.value;

    const orderDto = {
      customerName: formValues.name,
      customerEmail: formValues.email,
      contactNumber: formValues.number.toString(),
      address: formValues.address,
      productId: +this.singleProduct.pId,
      productQuantity: +formValues.numberofitem,
      totalPrice: this.calculateTotalPrice(), // 👈 auto-calculated
      message: formValues.message,
      paymentStatus: this.paymentStatusOptions[0] // Default to 'Pending'
    };
    //call the API to submit the order
    this.apiService.addOrder(orderDto).subscribe(
      (response) => {
        var message = response.message;
        var type = response.success ? "success" : "error";
        this.dialog.open(MessageDialogComponent, {
          data: { message, type },
          // width: '300px'
        });
        this.orderform.reset();
      },
      (error) => {
        var message = "Error submitting order";
        var type = "error";
        this.dialog.open(MessageDialogComponent, {
          data: { message, type },
          // width: '300px'
        });
      }
    );
    console.log(orderDto);
  }




  buy(productData: any) {
    this.singleProduct = productData;
    console.log('Selected product:', this.singleProduct);
  }





  char: any = [

    { url: "../../assets/chair/i (1).jfif", name: "Chair" },
    { url: "../../assets/chair/i (2).jfif", name: "Chair" },
    { url: "../../assets/chair/i (3).jfif", name: "Chair" },

    { url: "../../assets/chair/i (1).jpeg", name: "Chair" },
    { url: "../../assets/chair/i (2).jpeg", name: "Chair" },
    { url: "../../assets/chair/i (1).jpg", name: "Chair" },
    { url: "../../assets/chair/i (3).jpg", name: "Chair" },

    { url: "../../assets/chair/i (6).jpg", name: "Chair" },
    { url: "../../assets/chair/i (7).jpg", name: "Chair" },
    { url: "../../assets/chair/i (8).jpg", name: "Chair" },
    { url: "../../assets/chair/i (9).jpg", name: "Chair" },
    { url: "../../assets/chair/i (10).jpg", name: "Chair" },
    { url: "../../assets/chair/i (11).jpg", name: "Chair" },
    { url: "../../assets/chair/i (12).jpg", name: "Chair" },
    { url: "../../assets/chair/i (13).jpg", name: "Chair" },
    { url: "../../assets/chair/i (14).jpg", name: "Chair" },
    { url: "../../assets/chair/i (15).jpg", name: "Chair" },
    { url: "../../assets/chair/i (16).jpg", name: "Chair" },
    { url: "../../assets/chair/i (17).jpg", name: "Chair" },
    { url: "../../assets/chair/i (18).jpg", name: "Chair" },
    { url: "../../assets/chair/i (1).webp", name: "Chair" },
    { url: "../../assets/chair/i (3).webp", name: "Chair" },
    { url: "../../assets/chair/i (4).webp", name: "Chair" },
    { url: "../../assets/chair/i (5).webp", name: "Chair" },
    { url: "../../assets/chair/i (6).webp", name: "Chair" },
    { url: "../../assets/chair/i (7).webp", name: "Chair" },
    { url: "../../assets/chair/i (8).webp", name: "Chair" },

    { url: "../../assets/chair/i (10).webp", name: "Chair" },
    { url: "../../assets/chair/i (11).webp", name: "Chair" },
    { url: "../../assets/chair/i (12).webp", name: "Chair" },
    { url: "../../assets/chair/i (13).webp", name: "Chair" },
    { url: "../../assets/chair/i (14).webp", name: "Chair" },
    { url: "../../assets/chair/i (15).webp", name: "Chair" },
    { url: "../../assets/chair/i (16).webp", name: "Chair" },
    { url: "../../assets/chair/i (17).webp", name: "Chair" },
    { url: "../../assets/chair/i (18).webp", name: "Chair" },
    { url: "../../assets/chair/i (19).webp", name: "Chair" },
    { url: "../../assets/chair/i (20).webp", name: "Chair" },
    { url: "../../assets/chair/i (21).webp", name: "Chair" },



  ]



}
