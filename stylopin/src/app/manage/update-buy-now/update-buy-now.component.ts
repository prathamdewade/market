import { Component , OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { APIService } from '../../shardData/api.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../../message-dialog/message-dialog.component';
import { LoaderComponent } from '../../loader/loader.component';

@Component({
  selector: 'app-update-buy-now',
  imports: [RouterModule, CommonModule,LoaderComponent],
  templateUrl: './update-buy-now.component.html',
  styleUrl: './update-buy-now.component.css'
})
export class UpdateBuyNowComponent implements OnInit{
 constructor(private service : APIService, private dialog: MatDialog) { }
 product:any=[1,2,3,4,5,6,7]
 orderData: any;
 isLoading=false;

  ngOnInit(): void {
    this.getAllOrders();
  }
 // fetch all orders
  getAllOrders() {
    this.isLoading = true; // Start loading
      this.service.getAllOrders().subscribe({
        next: (res) => {
         // console.log("Orders fetched successfully:", res.data);
          var message= res.message;
        var type = res.success ? "success" : "error";
         this.dialog.open(MessageDialogComponent, {
            data: { message, type },
          });
          this.orderData = res.data;
        },
        error: (err) => {
         // console.error('Error fetching orders:', err);
          var message = "Error fetching orders";
          this.dialog.open(MessageDialogComponent, {
            data: { message, type: "error" },
          });
        },
        complete: () => {
          this.isLoading = false; // Stop loading
        }
      });
    }

   alertDeletFuntion(id:any){
   var isConfirm=confirm("Are You sure Do you want to delete this product");
    if(isConfirm){
      this.service.deleteOrder(id).subscribe({
        next: (res) => {
          // console.log("Order deleted successfully:", res);
          // alert("Order deleted successfully");
          var message = res.message;
          var type = res.success ? "success" : "error";
          this.dialog.open(MessageDialogComponent, {
            data: { message, type },
          });
          this.getAllOrders(); // Refresh the order list
        },
        error: (err) => {
          // console.error('Error deleting order:', err);
          // alert("Error deleting order");
          var message = "Error deleting order";
          this.dialog.open(MessageDialogComponent, {
            data: { message, type: "error" },
          });
        }
      });
    }
   }
   

}
