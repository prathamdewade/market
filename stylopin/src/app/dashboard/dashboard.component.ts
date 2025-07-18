import { CommonModule } from '@angular/common';
import { Component ,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { APIService } from '../shardData/api.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
 productForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private apiservice: APIService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      status: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      image: ['', Validators.required]
    });
  }
 

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    this.productForm.get('image')?.setValue(this.selectedFile);
    }
  }

  onSubmit(){
    if (this.productForm.invalid || !this.selectedFile) {
      alert('Please fill all fields and select a product image.');
      return;
    }
  //apends 
 
  const formData = new FormData();
formData.append('PName', this.productForm.value.name); // ✅ Matches ProductDto
formData.append('Price', this.productForm.value.price.toString()); // toString() ensures it's not a number
formData.append('C_Name', this.productForm.value.category);
formData.append('Status', this.productForm.value.status); // ⚠️ Make sure it's a string 'true'/'false'
formData.append('ProductQuantity', this.productForm.value.quantity.toString());
formData.append('Description', this.productForm.value.description);
formData.append('Image', this.selectedFile); // ✅ use selectedFile (File object), not this.productForm.value.image


  // Debug: show all values
  for (let pair of formData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }
  // Call the service to add the product
  this.apiservice.addProduct(formData).subscribe({
      next: (response) => {
        console.log('Product added successfully', response);
        alert('Product added successfully');
        this.productForm.reset();
        this.selectedFile = null; // Reset the file input
      },
      error: (error) => {
        console.error('Error adding product', error); 
        alert('Error adding product. Please try again.');
      }

  }
  );
  }
  

 product:any=[1,2,3,4,5]
  ngOnInit(): void {
  }

  
   alertDeletFuntion(){
    confirm("Are You sure Do you want to delete this product")
   }
}
