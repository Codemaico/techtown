import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-buyer-dashboard',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterLink],
  templateUrl: './buyer-dashboard.component.html',
  styleUrl: './buyer-dashboard.component.css'
})
export class BuyerDashboardComponent implements OnInit {
  
  all_products:any[]=[];
  show_checkout:boolean = false;

  constructor(private router:Router, private customerService:CustomerService){
    
  }
  ngOnInit():void {
    this.getAllProduct();
  }

  getAllProduct() {
  this.customerService.allProduct().subscribe({
    next: (data: any) => {
      this.all_products = data;
    },
    error: (error) => {
      console.error("My error:", error);
    },
  });
}


  buyProduct(id:any){
    this.show_checkout = true;
    this.customerService.quickBuyProduct(id);
    this.router.navigateByUrl('/checkout');
  }

  addToCart(){
    alert("This is showcase.")
  }

}
