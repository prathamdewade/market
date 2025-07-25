import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit
} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { APIService } from '../../shardData/api.service';

@Component({
  selector: 'app-update-banner',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './update-banner.component.html',
  styleUrl: './update-banner.component.css'
})
export class UpdateBannerComponent implements OnInit {

  product: any ;

  

  bannerForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private apiService: APIService) {
    this.bannerForm = this.fb.group({
      image: ['', Validators.required],
      Description: ['', Validators.required],

    });
    


    this.updateBanner = this.fb.group({
      image: ['', Validators.required],
      Description: ['', Validators.required],
      Id:[0,Validators.required]

    });
  }
  ngOnInit(){
     this.getAllBanner();
  }
  getAllBanner(){
      this.apiService.getAllBanners().subscribe({
      next: (res) => {
        console.log("Banners fetched successfully:", res.data);
       this.product = res.data;
        console.log(this.product);
      },
      error: (err) => {
        console.error('Error fetching banners:', err);
      }
    });
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.bannerForm.get('image')?.setValue(this.selectedFile);
      this.updateBanner.get('image')?.setValue(this.selectedFile);
    }
  }

  submit() {
    if (this.bannerForm.invalid) {
      this.bannerForm.markAllAsTouched(); // 👈 Force show validation errors
      return;
    }

    const formData = new FormData();
    formData.append('Description', this.bannerForm.value.Description);
    if (this.selectedFile) {
      formData.append('Image', this.selectedFile);
    }
    // selectedFile is File from file input

    console.log(this.bannerForm.value);
    this.apiService.addBanner(formData).subscribe({
      next: () =>{
        alert('Banner added successfully');
        this.bannerForm.reset();
        this.selectedFile = null; // Reset the file input
        this.getAllBanner(); // Refresh the banner list
      }
        ,
      error: err => {
        console.error('Error adding banner:', err);
        alert('Failed to add banner. Please try again.');
      }
    });
  }

  sendToUpdate(id: number) {
    const singleData=this.product.filter((item: any) => item.id === id);
    console.log("Single Data:", singleData);
    //patch the form with the data
    this.updateBanner.patchValue({
      image: singleData[0].imageName,
      Description: singleData[0].description,
      Id:singleData[0].id
    });
  }


  updateBanner: FormGroup;
  Update() {
    if (this.updateBanner.invalid) {
      this.updateBanner.markAllAsTouched(); // 👈 Force show validation errors
      return;
    }
    console.log(this.updateBanner.value);
     const formData = new FormData();
    formData.append('Description', this.updateBanner.value.Description);
    if (this.selectedFile) {
      formData.append('Image', this.selectedFile);
    }
    const id = this.updateBanner.value.Id;

    this.apiService.updateBanner(formData, id).subscribe({
      next: (res) => {
        console.log('Banner updated successfully', res);
        alert('Banner updated successfully');
        this.updateBanner.reset();
        this.selectedFile = null; // Reset the file input
        this.getAllBanner(); // Refresh the banner list after update
      },
      error: (error) => {
        console.error('Error updating banner', error);
        alert('Error updating banner. Please try again.');
      }
    });


  }


  alertDeletFuntion(id: any) {
    var isConfirm = confirm("Are You sure Do you want to delete this product");
    if (isConfirm) {
      this.apiService.deleteBanner(id).subscribe({
        next: (res) => {
          console.log("Banner deleted successfully:", res);
          alert("Banner deleted successfully");
          this.getAllBanner(); // Refresh the banner list after deletion
        },
        error: (err) => {
          console.error('Error deleting banner:', err);
          alert('Failed to delete banner. Please try again.');
        }
      });
    }
  }
}
