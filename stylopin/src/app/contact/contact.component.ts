import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIService } from '../shardData/api.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  contactUSform: FormGroup;

  constructor(private fb: FormBuilder, private apiService: APIService, private dialog : MatDialog) {
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
  
  const obj = {
      name: this.contactUSform.value.name,
      email: this.contactUSform.value.email,
      contactNumber: this.contactUSform.value.contactNumber,
      query: this.contactUSform.value.message,
      subject: this.contactUSform.value.subject
    };
    this.apiService.addContact(obj).subscribe({
      next: (res :any) => {
        console.log(res);
        this.dialog.open(MessageDialogComponent, {
          data: {
            message: 'Your query has been submitted successfully.',
            type: 'success'
          }
        });
        this.contactUSform.reset();
      },
      error: (err:any) => {
        console.error(err);
        this.dialog.open(MessageDialogComponent, {
          data: {
            message: 'Failed to submit your query. Please try again later.',
            type: 'error'
          }
        });
      }
    });
    
  }


  
}
