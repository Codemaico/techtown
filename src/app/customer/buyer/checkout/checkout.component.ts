import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  Address,
  Order,
  Product,
  User,
} from "../../../core/Model/object_model";
import { CustomerService } from "../../services/customer.service";
import { Router, RouterLink } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-checkout",
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: "./checkout.component.html",
  styleUrl: "./checkout.component.css",
})
export class CheckoutComponent implements OnInit {
  single_product_id: any;
  user_id: any;
  individual_product!: Product;
  user_details!: User;
  user_address!: Address;
  user_contact_no: any;
  order_details!: Order;

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerService.currentProduct.subscribe(
      (product) => (this.single_product_id = product)
    );
    this.user_id = sessionStorage.getItem("user_session_id");
    this.productDetail(this.single_product_id);
    this.userAddress(this.user_id);
  }

  productDetail(single_product_id: any) {
    this.customerService.individualProduct(single_product_id).subscribe({
      next: (data: any) => {
        console.log("Received product data:", data);
        this.individual_product = data;
        console.log("My single product", this.individual_product);
      },
      error: (error) => {
        console.error("My error:", error);
      },
    });
  }

  userAddress(user_id: any) {
    this.customerService.userDetail(user_id).subscribe({
      next: (data: any) => {
        this.user_address = data.address;
        this.user_contact_no = data.mobNumber;
      },
      error: (error) => {
        console.error("My error:", error);
      },
    });
  }

  placeOrder() {
    this.order_details = {
      id: 0,
      userId: this.user_id,
      sellerId: 2,
      product: {
        id: this.individual_product.id,
        name: this.individual_product.name,
        uploadPhoto: this.individual_product.uploadPhoto,
        productDescription: this.individual_product.productDescription,
        mrp: this.individual_product.mrp,
        dp: this.individual_product.dp,
        status: this.individual_product.status,
      },
      deliveryAddress: {
        id: 0,
        name: this.user_address.name,
        addLine1: this.user_address.addLine1,
        addLine2: this.user_address.addLine2,
        city: this.user_address.city,
        state: this.user_address.state,
        zipCode: this.user_address.zipCode,
      },
      contact: this.user_contact_no,
      dateTime: new Date().toLocaleDateString(),
    };

    this.customerService.insertNeworder(this.order_details).subscribe({
      next: (data: any) => {
        console.warn("My single product", data);
        this.router.navigateByUrl("/buyer-dashboard");
        console.log("Place Order Detail", this.order_details);
      },
      error: (error) => {
        console.error("My error:", error);
      },
    });
  }
}
