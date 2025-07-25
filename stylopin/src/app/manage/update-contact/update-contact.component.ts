import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { APIService } from '../../shardData/api.service';

@Component({
  selector: 'app-update-contact',
  imports: [RouterModule,CommonModule],
  templateUrl: './update-contact.component.html',
  styleUrl: './update-contact.component.css'
})
export class UpdateContactComponent implements OnInit{
 // data:any;

 constructor(private dataService: APIService) { }
 product:any;
  ngOnInit() {
    this.dataService.getAllContact().subscribe((res)=>{
      this.product=res.data;
      console.log(res)
    })
  }


   alertDeletFuntion(id:any){
   var isConfirm=confirm("Are You sure Do you want to delete this product");
    if(isConfirm){
      this.dataService.deleteContact(id).subscribe((res)=>{
        console.log(res);
        this.ngOnInit(); // Refresh the contact list after deletion
      },(err)=>{
        console.error("Error deleting contact:", err);
      });
    }
   }
   
   

}