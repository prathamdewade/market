import { CommonModule } from '@angular/common';
import { Component,
  OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-update-about',
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './update-about.component.html',
  styleUrl: './update-about.component.css'
})
export class UpdateAboutComponent implements OnInit{

 product:any=[1,2,3]
  ngOnInit(): void {
  }

  aboutform: FormGroup;
  aboutUpdateform: FormGroup;

  constructor(private fb: FormBuilder) {
    this.aboutform = this.fb.group({
      title: ['', Validators.required],
      subTitle: ['', Validators.required],
      images:['', Validators.required],
      Description:  ['', Validators.required],
    });

    this.aboutUpdateform = this.fb.group({
      title: ['', Validators.required],
      subTitle: ['', Validators.required],
      images:['', Validators.required],
      Description:  ['', Validators.required],
      aid:['3', Validators.required],
    });

  }




  submit() {
    if (this.aboutform.invalid) {
    this.aboutform.markAllAsTouched(); // 👈 Force show validation errors
    return;
  }
    console.log(this.aboutform.value);
  }


  Update() {
    if (this.aboutUpdateform.invalid) {
    this.aboutUpdateform.markAllAsTouched(); // 👈 Force show validation errors
    return;
  }
    console.log(this.aboutUpdateform.value);
  }

  

    alertDeletFuntion(id:any){
   var isConfirm=confirm("Are You sure Do you want to delete this product");
    if(isConfirm){
      
    }
   }
}
