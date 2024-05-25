import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../core/Model/object_model';
import { Router } from '@angular/router';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent  implements OnInit {

 all_product_data:any;
 addEditProductForm!:FormGroup;
 addEditProduct:boolean = false;
 popup_header!:string;
 add_product:boolean = false; 
 edit_product:boolean = false; 
 product_data:any;
 single_product_data:any;
 product_details!:Product;
 edit_product_id:any;
  
  constructor(private fb:FormBuilder, private router:Router, private productService: ProductService){}

  ngOnInit(): void {
    this.getAllProduct();
    this.addEditProductForm = this.fb.group({
      id:['',Validators.required],
      name:['',Validators.required],
      uploadPhoto:['',Validators.required],
      productDescription:[''],
      mrp:['',Validators.required],
      dp:['',Validators.required],
      status:['',Validators.required] 
    })
    
  }
  get rf(){
    return this.addEditProductForm.controls;
  }

  getAllProduct(){
    return this.productService.allProduct().subscribe({
      next: (data: any)=>{
        console.log(data);
        this.all_product_data = data;

      },error: (error) => {
        console.error("My error:", error);
      },
    })
  }

  addProductPopup(){
    this.add_product = true;
    this.edit_product = false;
    this.popup_header = "Add New Product";
    this.addEditProductForm.reset();
  }

  addNewProduct(){
    this.addEditProduct = true;
    if(this.addEditProductForm.invalid){
      return;
    }
    this.product_data = this.addEditProductForm.value;
    this.product_details = {
      id:this.product_data.id,
      name:this.product_data.name,
      uploadPhoto:this.product_data.uploadPhoto,
      productDescription:this.product_data.productDescription,
      mrp:this.product_data.mrp,
      dp:this.product_data.dp,
      status:this.product_data.status
    }
    this.productService.addNewProduct(this.product_details).subscribe({
      next: (data: any) => {
        console.log("My single product", data);
        this.getAllProduct();
        const modalElement = document.getElementById('addEditUserModal') ?? document.createElement('div');
        modalElement.classList.toggle('show'); // Toggle modal visibility
      },
      error: (error) => {
        console.error("My error:", error);
      },
    })
  }

  editProductPopup(id:any){
    this.edit_product_id = id;
    this.add_product = false;
    this.edit_product = true;
    this.popup_header = "Edit Product";
    this.addEditProductForm.reset();
    this.productService.singleProduct(id).subscribe({
      next: (data) => {
        this.single_product_data = data;
        this.addEditProductForm.setValue({
          id:this.single_product_data.id,
          name: this.single_product_data.name,
          uploadPhoto: this.single_product_data.uploadPhoto,
          productDescription: this.single_product_data.productDescription,
          mrp: this.single_product_data.mrp,
          dp: this.single_product_data.dp,
          status: this.single_product_data.status,
        });
      },
      error: (error) => {
        console.error("My error:", error);
      },
    })
  }

  updateProduct(){
    this.addEditProduct = true;
    if(this.addEditProductForm.invalid){
      return;
    }
    this.product_data = this.addEditProductForm.value;
    this.product_details = {
      id:this.product_data.id,
      name:this.product_data.name,
      uploadPhoto:this.product_data.uploadPhoto,
      productDescription:this.product_data.productDescription,
      mrp:this.product_data.mrp,
      dp:this.product_data.dp,
      status:this.product_data.status
    }
    this.productService.updateProduct(this.edit_product_id,this.product_details).subscribe({
      next: (data) => {
        console.log("My single product", data);
        this.getAllProduct();
        const modalElement = document.getElementById('addEditUserModal') ?? document.createElement('div');
        modalElement.classList.toggle('show'); // Toggle modal visibility
        
      },
      error: (error) => {
        console.error("My error:", error);
      },
    })

  }

  deleteProduct(id:any) {
    let conf = confirm("Are you sure you want to delete this product id:" +id);
    if(conf){
      this.productService.deleteProduct(id).subscribe({
        next: (data) => {
          console.log("Deleted successfully");
          this.getAllProduct();
          
        },
        error: (error) => {
          console.error("My error:", error);
        },
      })
    }else{
      alert("You pressed cancel !")
    }
  }
}
     
