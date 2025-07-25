import { Component , OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { APIService } from '../../shardData/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-buy-now',
  imports: [RouterModule, CommonModule],
  templateUrl: './update-buy-now.component.html',
  styleUrl: './update-buy-now.component.css'
})
export class UpdateBuyNowComponent implements OnInit{
 constructor(private service : APIService) { }
 product:any=[1,2,3,4,5,6,7]
 orderData: any;

  ngOnInit(): void {
    this.getAllOrders();
  }
 // fetch all orders
  getAllOrders() {
      this.service.getAllOrders().subscribe({
        next: (res) => {
          console.log("Orders fetched successfully:", res.data);
          this.orderData = res.data;
        },
        error: (err) => {
          console.error('Error fetching orders:', err);
        }
      });
    }

   alertDeletFuntion(id:any){
   var isConfirm=confirm("Are You sure Do you want to delete this product");
    if(isConfirm){
      this.service.deleteOrder(id).subscribe({
        next: (res) => {
          console.log("Order deleted successfully:", res);
          alert("Order deleted successfully");
          this.getAllOrders(); // Refresh the order list
        },
        error: (err) => {
          console.error('Error deleting order:', err);
          alert("Error deleting order");
        }
      });
    }
   }
   

}
