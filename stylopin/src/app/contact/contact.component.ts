import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  contactUSform: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactUSform = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
      contactNumber:['', Validators.required],
    });
  }




  submit() {
    if (this.contactUSform.invalid) {
    this.contactUSform.markAllAsTouched(); // 👈 Force show validation errors
    return;
  }
    console.log(this.contactUSform.value);
  }


  
}
