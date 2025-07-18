import { CommonModule } from '@angular/common';
import { Component,
  OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-update-banner',
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './update-banner.component.html',
  styleUrl: './update-banner.component.css'
})
export class UpdateBannerComponent implements OnInit{

 product:any=[1,2,3,4,5,6,7]
  
  ngOnInit(): void {
  }

  bannerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.bannerForm = this.fb.group({
      images: ['', Validators.required],
      Description: ['', Validators.required],
   
    });


     this.updateBanner = this.fb.group({
      images: ['', Validators.required],
      Description: ['', Validators.required],
   
    });
  }
  submit() {
    if (this.bannerForm.invalid) {
    this.bannerForm.markAllAsTouched(); // 👈 Force show validation errors
    return;
  }
    console.log(this.bannerForm.value);
  }



  updateBanner: FormGroup;
  Update() {
    if (this.updateBanner.invalid) {
    this.updateBanner.markAllAsTouched(); // 👈 Force show validation errors
    return;
  }
    console.log(this.updateBanner.value);
  }


   alertDeletFuntion(id:any){
   var isConfirm=confirm("Are You sure Do you want to delete this product");
    if(isConfirm){
      
    }
   }
}
