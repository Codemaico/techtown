import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { User } from '../../core/Model/object_model';



@Component({
  selector: 'app-user-crud',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-crud.component.html',
  styleUrl: './user-crud.component.css'
})
export class UserCrudComponent implements OnInit {

  all_User_Data:any;
  single_user_data:any;
  addEditUserForm!:FormGroup;
  user_details!:User;
  user_reg_data:any;
  edit_id:any;
  upload_file_name!:string; 
  addEditUser:boolean = false;  // for form validation
  add_user:boolean = false;
  edit_user:boolean = false;
  popup_header!:string;
  signInFormValue:any = {}

  constructor(private formBuilder: FormBuilder, private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
    this.getAllUser();
    this.addEditUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      mobNumber: ['', Validators.required],
      age: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      addLine1: ['', Validators.required],
      addLine2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      languages: ['', Validators.required],
      gender: ['', Validators.required],
      aboutYou: ['', Validators.required],
      upLoadPhoto: ['', Validators.required],
      agreeTC: [false, Validators.required], 
      role: ['', Validators.required],
    })
  }

  getAllUser() {
    this.adminService.allUser().subscribe({
      next: data => {
        this.all_User_Data = data;
      },
      error: error => {
        console.log("My error", error);
      }
    });
  }
  

  get rf(){
    return this.addEditUserForm.controls;
  }

  addUserPopup(){
    this.edit_user = false;
    this.add_user = true;
    this.popup_header = "Add New User";
    this.addEditUserForm.reset();
  }

  addUser() {
    this.addEditUser = true;
    if(this.addEditUserForm.invalid){
      alert('Error!! :-)\n\n' + JSON.stringify(this.addEditUserForm.value))
      return;
    }
    this.user_reg_data = this.addEditUserForm.value;
    this.user_details = {
      name: this.user_reg_data.name,
      mobNumber: this.user_reg_data.mobNumber,
      age: this.user_reg_data.age,
      dob: this.user_reg_data.dob,
      
      email: this.user_reg_data.email,
      password: this.user_reg_data.password,
      address: {
        id: 0,
        addLine1: this.user_reg_data.addLine1,
        addLine2: this.user_reg_data.addLine2,
        city: this.user_reg_data.city,
        state: this.user_reg_data.state,
        zipCode: this.user_reg_data.zipCode,
        
      },
      languages: this.user_reg_data.languages,
      gender: this.user_reg_data.gender,
      aboutYou: this.user_reg_data.aboutYou,
      upLoadPhoto: this.user_reg_data.upLoadPhoto,
      agreeTC: this.user_reg_data.agreeTC,
      role: this.user_reg_data.role
    }
    this.adminService.addUser(this.user_details)
    .subscribe({
      next: (data) => {
        console.log
        this.getAllUser();
        const modalElement = document.getElementById('addEditUserModal') ?? document.createElement('div');
        modalElement.classList.toggle('show'); // Toggle modal visibility
      },
      error: (error) => {
        console.error('Error adding user:', error);
      },
    });
  }
  
  editUserPopup(id:any){
    this.edit_id = id;
    this.edit_user = true;
    this.add_user = false;
    this.popup_header = "Edit User";
    this.addEditUserForm.reset();
    this.adminService.singleUser(id).subscribe({
      next: (data) => {
        this.single_user_data = data;
        this.upload_file_name = this.single_user_data.upLoadPhoto;
        this.addEditUserForm.setValue({
          name: this.single_user_data.name,
          mobNumber: this.single_user_data.mobNumber,
          age: this.single_user_data.age,
          dob: this.single_user_data.dob,
          email: this.single_user_data.email,
          password: this.single_user_data.password,
          addLine1: this.single_user_data.address.addLine1,
          addLine2: this.single_user_data.address.addLine2,
          city: this.single_user_data.address.city,
          state: this.single_user_data.address.state,
          zipCode: this.single_user_data.address.zipCode,
          languages: this.single_user_data.languages,
          gender: this.single_user_data.gender,
          aboutYou: this.single_user_data.aboutYou,
          upLoadPhoto: '',
          agreeTC: this.single_user_data.agreeTC,
          role: this.single_user_data.role,
        });
      },
      error: (error) => {
        console.log("My error", error);
      },
    });
    
  }

  updateUser() {
    
    if(this.addEditUserForm.invalid){
      alert('Error!! :-)\n\n' + JSON.stringify(this.addEditUserForm.value))
      return;
    }
    this.user_reg_data = this.addEditUserForm.value;
    this.user_details = {
      name: this.user_reg_data.name,
      mobNumber: this.user_reg_data.mobNumber,
      age: this.user_reg_data.age,
      dob: this.user_reg_data.dob,
      
      email: this.user_reg_data.email,
      password: this.user_reg_data.password,
      address: {
        id: 0,
        addLine1: this.user_reg_data.addLine1,
        addLine2: this.user_reg_data.addLine2,
        city: this.user_reg_data.city,
        state: this.user_reg_data.state,
        zipCode: this.user_reg_data.zipCode,
        
      },
      languages: this.user_reg_data.languages,
      gender: this.user_reg_data.gender,
      aboutYou: this.user_reg_data.aboutYou,
      upLoadPhoto: (this.user_reg_data.upLoadPhoto ==""? this.upload_file_name:this.user_reg_data.upLoadPhoto),
      agreeTC: this.user_reg_data.agreeTC,
      role: this.user_reg_data.role
    }
    this.adminService.editUser(this.edit_id, this.user_details).subscribe({
      next: (data) => {
        console.log(data);
        this.getAllUser();
        const modalElement = document.getElementById('addEditUserModal') ?? document.createElement('div');
        modalElement.classList.toggle('show'); // Toggle modal visibility
      },
      error: (error) => {
        console.log("My error", error);
      },
    });
  }
  
  deleteUser(id: any) {
    this.adminService.deleteUser(id).subscribe({
      next: (data) => {
        console.log(data); // Log the response from the server for debugging
        this.getAllUser(); // Refresh user list after successful deletion
      },
      error: (error) => {
        console.log("My error", error); // Log the error for debugging
      },
    });
  }
  
}
    

