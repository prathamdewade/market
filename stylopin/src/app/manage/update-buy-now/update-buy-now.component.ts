import { Component , OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-update-buy-now',
  imports: [RouterModule],
  templateUrl: './update-buy-now.component.html',
  styleUrl: './update-buy-now.component.css'
})
export class UpdateBuyNowComponent implements OnInit{
 constructor() { }
 product:any=[1,2,3,4,5,6,7]
  ngOnInit(): void {
  }


   alertDeletFuntion(id:any){
   var isConfirm=confirm("Are You sure Do you want to delete this product");
    if(isConfirm){
      
    }
   }
   

}
