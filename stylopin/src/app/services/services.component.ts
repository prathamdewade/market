import { CommonModule } from '@angular/common';
import { Component,
  OnInit } from '@angular/core';
<<<<<<< HEAD
  

=======
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
>>>>>>> origin/main
@Component({
  selector: 'app-services',
    imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit {
<<<<<<< HEAD
  /**
   *
   */
  constructor() {
   
    
  }
=======

>>>>>>> origin/main

  ngOnInit(): void {
  }

  orderform: FormGroup;

  constructor(private fb: FormBuilder) {
    this.orderform = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      number: ['', Validators.required],
      numberofitem:['', Validators.required],
      address:  ['', Validators.required],
      message: ['', Validators.required],
      productID: ['4', Validators.required],
    });
  }




  submit() {
    if (this.orderform.invalid) {
    this.orderform.markAllAsTouched(); // 👈 Force show validation errors
    return;
  }
    console.log(this.orderform.value);
  }









  char:any=[
   
    {url: "../../assets/chair/i (1).jfif", name: "Chair"},
    {url: "../../assets/chair/i (2).jfif", name: "Chair"},
    {url: "../../assets/chair/i (3).jfif", name: "Chair"},

    {url: "../../assets/chair/i (1).jpeg", name: "Chair"},
    {url: "../../assets/chair/i (2).jpeg", name: "Chair"},
    {url: "../../assets/chair/i (1).jpg", name: "Chair"},
    {url: "../../assets/chair/i (3).jpg", name: "Chair"},
   
    {url: "../../assets/chair/i (6).jpg", name: "Chair"},
    {url: "../../assets/chair/i (7).jpg", name: "Chair"},
    {url: "../../assets/chair/i (8).jpg", name: "Chair"},
    {url: "../../assets/chair/i (9).jpg", name: "Chair"},
    {url: "../../assets/chair/i (10).jpg", name: "Chair"},
    {url: "../../assets/chair/i (11).jpg", name: "Chair"},
    {url: "../../assets/chair/i (12).jpg", name: "Chair"},
    {url: "../../assets/chair/i (13).jpg", name: "Chair"},
    {url: "../../assets/chair/i (14).jpg", name: "Chair"},
    {url: "../../assets/chair/i (15).jpg", name: "Chair"},
    {url: "../../assets/chair/i (16).jpg", name: "Chair"},
    {url: "../../assets/chair/i (17).jpg", name: "Chair"},
    {url: "../../assets/chair/i (18).jpg", name: "Chair"},
    {url: "../../assets/chair/i (1).webp", name: "Chair"},
    {url: "../../assets/chair/i (3).webp", name: "Chair"},
    {url: "../../assets/chair/i (4).webp", name: "Chair"},
    {url: "../../assets/chair/i (5).webp", name: "Chair"},
    {url: "../../assets/chair/i (6).webp", name: "Chair"},
    {url: "../../assets/chair/i (7).webp", name: "Chair"},
    {url: "../../assets/chair/i (8).webp", name: "Chair"},
  
    {url: "../../assets/chair/i (10).webp", name: "Chair"},
    {url: "../../assets/chair/i (11).webp", name: "Chair"},
    {url: "../../assets/chair/i (12).webp", name: "Chair"},
    {url: "../../assets/chair/i (13).webp", name: "Chair"},
    {url: "../../assets/chair/i (14).webp", name: "Chair"},
    {url: "../../assets/chair/i (15).webp", name: "Chair"},
    {url: "../../assets/chair/i (16).webp", name: "Chair"},
    {url: "../../assets/chair/i (17).webp", name: "Chair"},
    {url: "../../assets/chair/i (18).webp", name: "Chair"},
    {url: "../../assets/chair/i (19).webp", name: "Chair"},
    {url: "../../assets/chair/i (20).webp", name: "Chair"},
    {url: "../../assets/chair/i (21).webp", name: "Chair"},
    
  
  
  ]
buyid:any=0
  buy(id:any){
    this.buyid=id;
  }

 
}
