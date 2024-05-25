import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  user_dashboard_data:any;
  total_user:number = 0;
  admin_user:number = 0;
  seller_user:number = 0;
  buyer_user:number = 0;

  product_dashboard_data:any;
  total_properties:number = 0;
  publish_properties:number = 0;
  inactive_properties:number = 0;
  draft_properties:number = 0;

  constructor(private router:Router, private adminService:AdminService) { }

  ngOnInit(): void {
    this.adminProductDashboard();
    this. adminUserDashboardData();
  }

  userDashboard(){
    this.router.navigateByUrl("/admin/user");
  }

  productDashboard(){
    this.router.navigateByUrl("/admin/product");
  }
  
  adminUserDashboardData() {
    this.adminService.userDashboardData().subscribe({
      next: (data) => {
        this.user_dashboard_data = data;
        console.log(this.user_dashboard_data);
        this.admin_user = 0; // Initialize counters to 0 before iterating
        this.seller_user = 0;
        this.buyer_user = 0;
        this.total_user = 0;
        for (let user in this.user_dashboard_data) {
          if (this.user_dashboard_data[user].role === "admin") {
            ++this.admin_user;
          } else if (this.user_dashboard_data[user].role === "seller") {
            ++this.seller_user;
          } else if (this.user_dashboard_data[user].role === "buyer") {
            ++this.buyer_user;
          }
          ++this.total_user;
        }
      },
      error: (error) => {
        console.error("My error", error);
      },
    });
  }
  
  adminProductDashboard() {
    this.adminService.productDashboardData().subscribe({
      next: (data) => {
        this.product_dashboard_data = data;
        console.log(this.product_dashboard_data);
        this.publish_properties = 0; // Initialize counters to 0 before iterating
        this.inactive_properties = 0;
        this.draft_properties = 0;
        this.total_properties = 0;
        for (let status in this.product_dashboard_data) {
          if (this.product_dashboard_data[status].status === "publish") {
            ++this.publish_properties;
          } else if (this.product_dashboard_data[status].status === "inactive") {
            ++this.inactive_properties;
          } else if (this.product_dashboard_data[status].status === "draft") {
            ++this.draft_properties;
          }
          ++this.total_properties;
        }
      },
      error: (error) => {
        console.error("My error", error);
      },
    });
  }
  
}
