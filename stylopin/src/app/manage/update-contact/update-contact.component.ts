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
  data:any;

 constructor(private dataService: APIService) { }
 product:any=[1,2,3,4,5,6,7]
  ngOnInit() {
    this.dataService.getProducts().subscribe((res)=>{
      this.data=res;
      console.log(res)
    })
  }


   alertDeletFuntion(id:any){
   var isConfirm=confirm("Are You sure Do you want to delete this product");
    if(isConfirm){
      
    }
   }
   
   

}