import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit
} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { APIService } from '../../shardData/api.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../../message-dialog/message-dialog.component';
import { LoaderComponent } from '../../loader/loader.component';

@Component({
  selector: 'app-update-banner',
  imports: [RouterModule, ReactiveFormsModule, CommonModule,LoaderComponent],
  templateUrl: './update-banner.component.html',
  styleUrl: './update-banner.component.css'
})
export class UpdateBannerComponent implements OnInit {

  product: any ;
  isLoading=false;
  

  bannerForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private apiService: APIService ,private dialog: MatDialog) {
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
    this.isLoading = true; // Start loading
      this.apiService.getAllBanners().subscribe({
      next: (res) => {
        console.log("Banners fetched successfully:", res.data);
         this.product = res.data;
               var message= res.message;
                var type = res.success ? "success" : "error";
                 this.dialog.open(MessageDialogComponent, {
                    data: { message, type },
                  });
        
      },
      error: (err) => {
        console.error('Error fetching banners:', err);
        this.dialog.open(MessageDialogComponent, {
          data: { message: 'Failed to fetch banners. Please try again.', type: 'error' },
        });
      },
      complete: () => {
        this.isLoading = false; // Stop loading
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
        //alert('Banner added successfully');
        console.log('Banner added successfully');
        var message = 'Banner added successfully';
        var type = 'success';
        this.dialog.open(MessageDialogComponent, {
          data: { message, type },
        });
        this.bannerForm.reset();
        this.selectedFile = null; // Reset the file input
        this.getAllBanner(); // Refresh the banner list
      }
        ,
      error: err => {
        console.error('Error adding banner:', err);
       // alert('Failed to add banner. Please try again.');
        var message = 'Failed to add banner. Please try again.';
        var type = 'error';
        this.dialog.open(MessageDialogComponent, {
          data: { message, type },
        });
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
        //console.log('Banner updated successfully', res);
       // alert('Banner updated successfully');
        var message = 'Banner updated successfully';
        var type = 'success';
        this.dialog.open(MessageDialogComponent, {
          data: { message, type },
        });
         console.log("Banner updated successfully:", res);
         // Reset the form
        this.updateBanner.reset();
        this.selectedFile = null; // Reset the file input
        this.getAllBanner(); // Refresh the banner list after update
      },
      error: (error) => {
        // console.error('Error updating banner', error);
        // alert('Error updating banner. Please try again.');
        var message = 'Error updating banner. Please try again.';
        var type = 'error';
        this.dialog.open(MessageDialogComponent, {
          data: { message, type },
        });
      }
    });


  }


  alertDeletFuntion(id: any) {
    var isConfirm = confirm("Are You sure Do you want to delete this product");
    if (isConfirm) {
      this.apiService.deleteBanner(id).subscribe({
        next: (res) => {
          // console.log("Banner deleted successfully:", res);
          // alert("Banner deleted successfully");
          var message = 'Banner deleted successfully';
          var type = 'success';
          this.dialog.open(MessageDialogComponent, {
            data: { message, type },
          });
          this.getAllBanner(); // Refresh the banner list after deletion
        },
        error: (err) => {
          // console.error('Error deleting banner:', err);
          // alert('Failed to delete banner. Please try again.');
          var message = 'Failed to delete banner. Please try again.';
          var type = 'error';
          this.dialog.open(MessageDialogComponent, {
            data: { message, type },
          });
        }
      });
    }
  }
}
