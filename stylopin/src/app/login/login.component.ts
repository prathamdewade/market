import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ServicesComponent } from '../services/services.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { APIService } from '../shardData/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [RouterModule, ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  /**
   *
   */
  //create object for login
  loginForm!: FormGroup;
  submitted = false;
  constructor(private service: APIService ,private fb: FormBuilder,private router: Router) { 
      this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
 

  onSubmit() {
    console.log('Form Submitted', this.loginForm.value);
      this.submitted = true;
    if (this.loginForm.invalid) return;

    // Call the service to login
     this.service.adminLogin(this.loginForm.value).subscribe({
      next: (data:any) => {
        console.log(data);
        //store token in local storage
        localStorage.setItem('token', data.data);
        this.router.navigate(['/Dashboard']);
        
        //redirect to dashboard
         // Redirect to the admin dashboard or show success message
      },
       error: (error) => {
         console.error('Login failed', error);
          //Handle login failure, e.g., show an error message
    
             }
    
     });
  }

   onReset(): void {
    this.submitted = false;
    this.loginForm.reset();
  }
}
