import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { APIService, Product } from '../shardData/api.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  productForm: FormGroup;
  selectedFile: File | null = null;
  updateProduct!: FormGroup;

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

    this.updateProduct = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      status: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      image: ['', Validators.required],
      pid: ['', Validators.required] // Assuming you have a unique identifier for the product
    });
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.productForm.get('image')?.setValue(this.selectedFile);
    }
  }

  onSubmit() {
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
        this.fetchProducts();
      },
      error: (error) => {
        console.error('Error adding product', error);
        alert('Error adding product. Please try again.');
      }

    }
    );
  }

  // Fetch all products on component initialization
  products: Product[] = [];
  fetchProducts() {
    this.apiservice.getAllProduct().subscribe((res: any) => {
      this.products = res.data;
      console.log(this.products);
    }, (error) => {
      console.error('Error fetching products', error);
    })
  }

  product: any = [1, 2, 3, 4, 5]
  ngOnInit(): void {
    this.fetchProducts(); // Fetch products when the component initializes
    console.log(this.products);
  }


  alertDeletFuntion(id: number) {
    console.log("Delete product with ID:", id);
    var permistion = confirm("Are You sure Do you want to delete this product");
    if (permistion) {
      this.apiservice.deleteProduct(id).subscribe((res: any) => {
        console.log(res);
        alert("Product Deleted Successfully");
        this.fetchProducts(); // Refresh the product list after deletion
      }, (error) => {
        console.error('Error deleting product', error);
        alert('Error deleting product. Please try again.');
      });
    }
  }
  sendToUpdate(id: number) {
    console.log("Update product with ID:", id);
    //get data in array product 
    const singleData = this.products.filter(item => item.pId === id);
    console.log("Single product data:", singleData);


    this.updateProduct.patchValue({
      name: singleData[0].pName,
      price: singleData[0].price,
      category: singleData[0].categoryName,
      status: singleData[0].status, // Convert boolean to string
      quantity: singleData[0].productQuantity,
      description: singleData[0].description,
      image: singleData[0].imageName, // Assuming you want to set the image 

      pid: singleData[0].pId // Assuming you have a unique identifier for the product
    });




    // Here you can implement the logic to redirect to the update page or open a modal
    // For example, you might want to navigate to an update rou}

  }
  onUpdateSubmit() {
    const formData = new FormData();
    formData.append('C_Name', this.updateProduct.value.category);
    formData.append('PName', this.updateProduct.value.name);
    formData.append('Price', this.updateProduct.value.price.toString());
    formData.append('Status', this.updateProduct.value.status.toString());
    formData.append('ProductQuantity', this.updateProduct.value.quantity.toString());
    formData.append('Description', this.updateProduct.value.description);

    if (this.selectedFile) {
      formData.append('Image', this.selectedFile);
    }

    const id = this.updateProduct.value.pid;  // Use this in URL

    this.apiservice.updateProduct(formData, id).subscribe({
      next: (res) => {
        console.log('Product updated successfully', res);
        alert('Product updated successfully');
        this.updateProduct.reset();
        this.selectedFile = null; // Reset the file input
        this.fetchProducts(); // Refresh the product list after update
      },
      error: (error) => {
        console.error('Error updating product', error);
        alert('Error updating product. Please try again.');
      }
    });

  }

}
