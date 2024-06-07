// login-signup.service.ts
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiService } from "../../core/service/api.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoginSignupService {
  public login_url = "http://localhost:3000";
  public reg_url = "http://localhost:3000";

  constructor(private http: HttpClient, private api: ApiService) {}

  authLogin(user_name: any, password: any): Observable<any> {
    return this.api.get(
      this.login_url + "/user?email=" + user_name + "&password=" + password
    );
  }

  userRegister(user_details: any): Observable<any> {
    return this.api.post(this.reg_url + "/user", user_details);
  }

  adminLogin(user_name: any, password: any): Observable<any> {
    return this.api.get(
      this.login_url +
        "/user?email=" +
        user_name +
        "&password=" +
        password +
        "&role=admin"
    );
  }
}
