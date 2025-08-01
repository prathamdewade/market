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
  selector: 'app-update-about',
  imports: [RouterModule, ReactiveFormsModule, CommonModule, LoaderComponent],
  templateUrl: './update-about.component.html',
  styleUrl: './update-about.component.css'
})
export class UpdateAboutComponent implements OnInit {

  selectedFile: File | null = null;
isLoading=false;
  product: any;
  ngOnInit() {
    this.getAllAbout();
  }

  aboutform: FormGroup;
  aboutUpdateform: FormGroup;

  constructor(private fb: FormBuilder, private apiService: APIService ,private dialog: MatDialog) {

    this.aboutform = this.fb.group({
      title: ['', Validators.required],
      subTitle: ['', Validators.required],
      image: ['', Validators.required],
      Description: ['', Validators.required],
    });

    


    this.aboutUpdateform = this.fb.group({
      title: ['', Validators.required],
      subTitle: ['', Validators.required],
      image: ['', Validators.required],
      Description: ['', Validators.required],
      aid: ['3', Validators.required],
    });

  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.aboutform.get('image')?.setValue(this.selectedFile);
      this.aboutUpdateform.get('image')?.setValue(this.selectedFile);
    }
  }

  getAllAbout() {
    this.isLoading = true; // Start loading
    this.apiService.getAllAbout().subscribe({
      next: (res) => {
        console.log("About section fetched successfully:", res.data);
        this.product = res.data;
        console.log(res);

        var message= res.message;
        var type = res.success ? "success" : "error";
         this.dialog.open(MessageDialogComponent, {
            data: { message, type },
          });

        console.log(this.product);
      },
      error: (err) => {
        console.error('Error fetching about section:', err);
        var message= err.message;
        var type = err.success ? "success" : "error";
         this.dialog.open(MessageDialogComponent, {
            data: { message, type },
          });
      },

      complete: () => {
        this.isLoading = false; // Stop loading
      }
    });
  }


  submit() {
    if (this.aboutform.invalid) {
      this.aboutform.markAllAsTouched(); // 👈 Force show validation errors
      return;
    }


    const formData = new FormData();

    formData.append('Heading', this.aboutform.value.title);
    formData.append('Paragraph', this.aboutform.value.Description);   // ✅ Map Description field to Paragraph
    formData.append('SubHeading', this.aboutform.value.subTitle);

    if (this.selectedFile) {
      formData.append('Image', this.selectedFile);
    }
    // Log FormData values:
    console.log(formData.values());


    console.log(this.aboutform.value);
    //call the api to add the about section
    this.apiService.addAbout(formData).subscribe({
      next: (res) => {
        console.log("About section added successfully:", res);
        //alert("About section added successfully");
         var message= res.message;
        var type = res.success ? "success" : "error";
         this.dialog.open(MessageDialogComponent, {
            data: { message, type },
          });

        this.getAllAbout(); // Refresh the about section list

      },
      error: (err) => {
        console.error('Error adding about section:', err);
        //alert("Error adding about section");
         var message= err.message;
        var type = err.success ? "success" : "error";
         this.dialog.open(MessageDialogComponent, {
            data: { message, type },
          });
      }
    });

  }
  

  // Function to handle the update operation
  onSendToUpdate(id: number) {
    const singleAboutData = this.product.find((item: any) => item.id === id);
    if (singleAboutData) {
      this.aboutUpdateform.patchValue({
        title: singleAboutData.heading,
        subTitle: singleAboutData.subHeading,
        Description: singleAboutData.paragraph,
        aid: singleAboutData.id
      });
      // Assuming the image is stored as a base64 string, you can set it directly

    }
  }


  Update() {
    if (this.aboutUpdateform.invalid) {
      this.aboutUpdateform.markAllAsTouched(); // 👈 Force show validation errors
      return;
    }
    const formData = new FormData();
    formData.append('Heading', this.aboutUpdateform.value.title);
    formData.append('Paragraph', this.aboutUpdateform.value.Description);
    formData.append('SubHeading', this.aboutUpdateform.value.subTitle);
    if (this.selectedFile) {
      formData.append('Image', this.selectedFile);
    }
    const id = this.aboutUpdateform.value.aid;
    console.log(this.aboutUpdateform.value);
    this.apiService.updateAbout(formData, id).subscribe({
      next: (res: any) => {
        console.log("About section updated successfully:", res);
        alert("About section updated successfully");
        this.getAllAbout(); // Refresh the about section list
      },
      error: (err: any) => {
        console.error('Error updating about section:', err);
        alert("Error updating about section");
      }
    });
  }



  alertDeletFuntion(id: any) {
    var isConfirm = confirm("Are You sure Do you want to delete this product");
    if (isConfirm) {
      this.apiService.deleteAbout(id).subscribe({
        next: (res) => {
          console.log("About section deleted successfully:", res);
          alert("About section deleted successfully");
          this.getAllAbout(); // Refresh the about section list after deletion
        },
        error: (err) => {
          console.error('Error deleting about section:', err);
          alert("Error deleting about section");
        }
      });

    }
  }
}
