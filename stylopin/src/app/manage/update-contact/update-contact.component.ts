import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { APIService } from '../../shardData/api.service';
import { LoaderComponent } from '../../loader/loader.component';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../../message-dialog/message-dialog.component';

@Component({
  selector: 'app-update-contact',
  imports: [RouterModule,CommonModule, LoaderComponent],
  templateUrl: './update-contact.component.html',
  styleUrl: './update-contact.component.css'
})
export class UpdateContactComponent implements OnInit{
 // data:any;
 isLoading = false;
 

  // Injecting the APIService to fetch and manage contact data

 constructor(private dataService: APIService, private dailog : MatDialog) { }
 product:any;
  ngOnInit() {
    this.isLoading = true; // Set loading to true when component initializes
    this.dataService.getAllContact().subscribe((res)=>{
      this.product=res.data;
    //  console.log(res)
    var message = "Contact data fetched successfully";
    var type = "success";
      this.dailog.open(MessageDialogComponent, {
        data: { message, type }
      });
      this.isLoading = false; // Set loading to false after data is fetched
    }
  , (err)=>{
      // console.error("Error fetching contact data:", err); 
      var message = "Failed to fetch contact data";
      var type = "error";
      this.dailog.open(MessageDialogComponent, {
        data: { message, type }
      });
    },
    () => {
      this.isLoading = false; // Set loading to false after data is fetched
     // console.log("Contact data fetched successfully");
    });
  
     // Set loading to false after data is fetched
  }


   alertDeletFuntion(id:any){
   var isConfirm=confirm("Are You sure Do you want to delete this product");
    if(isConfirm){
      this.dataService.deleteContact(id).subscribe((res)=>{
        //console.log(res);
        var message = "Contact deleted successfully";
        var type = "success";
        this.dailog.open(MessageDialogComponent, {
          data: { message, type }
        });
        this.ngOnInit(); // Refresh the contact list after deletion
      },(err)=>{
        console.error("Error deleting contact:", err);
      });
    }
   }
   
   

}