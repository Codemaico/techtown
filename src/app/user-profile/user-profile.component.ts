import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { User } from "../core/Model/object_model";
import { Router } from "@angular/router";
import { UserService } from "../shared/services/user.service";
import { error } from "console";

@Component({
  selector: "app-user-profile",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./user-profile.component.html",
  styleUrl: "./user-profile.component.css",
})
export class UserProfileComponent implements OnInit {
  userProfileForm!: FormGroup;
  userProfile: boolean = false;
  id!: any;
  user_data: any;
  user_update_data: any;
  user_details!: User;
  user_profile_pic: any;
  user_language: any;
  user_role: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private user_service: UserService
  ) {}

  ngOnInit(): void {
    this.id = sessionStorage.getItem("user_session_id");
    this.userProfileForm = this.formBuilder.group({
      name: ["", Validators.required],
      mobNumber: ["", Validators.required],
      age: ["", Validators.required],
      dob: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      addLine1: ["", Validators.required],
      addLine2: ["", Validators.required],
      city: ["", Validators.required],
      state: ["", Validators.required],
      zipCode: ["", Validators.required],
      languages: ["", Validators.required],
      gender: ["", Validators.required],
      aboutYou: ["", Validators.required],
      upLoadPhoto: ["", Validators.required],
      role: ["", Validators.required],
    });
    this.editUserData(this.id);
  }

  get rf() {
    return this.userProfileForm.controls;
  }

  editUserData(id: any) {
    this.user_service.getUserData(id).subscribe({
      next: (data) => {
        this.user_data = data;
        this.user_profile_pic = this.user_data.upLoadPhoto;
        this.user_language = this.user_data.languages;
        this.user_role = this.user_data.role;
        this.userProfileForm.setValue({
          name: this.user_data.name,
          mobNumber: this.user_data.mobNumber,
          age: this.user_data.age,
          dob: this.user_data.dob,
          email: this.user_data.email,
          password: this.user_data.password,
          addLine1: this.user_data.address.addLine1,
          addLine2: this.user_data.address.addLine2,
          city: this.user_data.address.city,
          state: this.user_data.address.state,
          zipCode: this.user_data.address.zipCode,
          languages: this.user_data.languages,
          gender: this.user_data.gender,
          aboutYou: this.user_data.aboutYou,
          upLoadPhoto: this.user_data.upLoadPhoto,
          agreeTC: this.user_data.agreeTC,
          role: this.user_data.role,
        });
      },
      error: (error) => {
        console.error("My error", error);
      },
    });
  }

  upDateProfile() {
    this.userProfile = true;
    if (this.userProfileForm.invalid) {
      return;
    }

    this.user_update_data = this.userProfileForm.value;
    this.user_details = {
      name: this.user_update_data.name,
      mobNumber: this.user_update_data.mobNumber,
      age: this.user_update_data.age,
      dob: this.user_update_data.dob,

      email: this.user_update_data.email,
      password: this.user_update_data.password,
      address: {
        id: 0,
        name: this.user_update_data.name,
        addLine1: this.user_update_data.addLine1,
        addLine2: this.user_update_data.addLine2,
        city: this.user_update_data.city,
        state: this.user_update_data.state,
        zipCode: this.user_update_data.zipCode,
      },
      languages: this.user_update_data.languages,
      gender: this.user_update_data.gender,
      aboutYou: this.user_update_data.aboutYou,
      upLoadPhoto:
        this.user_update_data.upLoadPhoto === ""
          ? this.user_profile_pic
          : this.user_update_data.upLoadPhoto,
      agreeTC: this.user_update_data.agreeTC,
      role: this.user_update_data.role,
    };

    this.user_service.updateUserData(this.id, this.user_details).subscribe({
      next: (data) => {
        alert("Profile Update Successful!");
        if (this.user_role === "admin") {
          this.router.navigateByUrl("/admin/dashboard");
        } else if (this.user_role === "seller") {
          this.router.navigateByUrl("/seller-dashboard");
        } else if (this.user_role === "buyer") {
          this.router.navigateByUrl("/buyer-dashboard");
        }
      },
      error: (error) => {
        console.error("My error", error);
      },
    });
  }
}
