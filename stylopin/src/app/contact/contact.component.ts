import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIService } from '../shardData/api.service';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  contactUSform: FormGroup;

  constructor(private fb: FormBuilder, private apiService: APIService) {
    this.contactUSform = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
      contactNumber: ['', Validators.required],
    });
  }




  submit() {
    if (this.contactUSform.invalid) {
      this.contactUSform.markAllAsTouched(); // 👈 Force show validation errors
      return;
    }
  

    var sendobj={
      name: this.contactUSform.get('name')?.value,
      email: this.contactUSform.get('email')?.value,
      subject: this.contactUSform.get('subject')?.value,
      query: this.contactUSform.get('message')?.value,
      contactNumber: this.contactUSform.get('contactNumber')?.value.toString(),
    }

    this.apiService.addContact(sendobj).subscribe({
      next: (res: any) => {
        console.log("Contact form submitted successfully:", res);
        alert("Contact form submitted successfully");
        this.contactUSform.reset();
      },
      error: (err: any) => {
        console.error('Error submitting contact form:', err);
        alert("Error submitting contact form");
      }
    });


    // Here you would typically send the formData to your server

  }



}
