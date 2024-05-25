import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public user_url = "http://localhost:3000/user/";
  public product_url = "http://localhost:3000/products";
  public all_user = "http://localhost:3000/user/";

  constructor(private apiService: ApiService) { }

  userDashboardData(): Observable<any>{
    return this.apiService.get(this.user_url);
  }

  productDashboardData(): Observable<any>{
    return this.apiService.get(this.product_url);
  }

  allUser():Observable<any>{
    return this.apiService.get(this.all_user);
  }

  addUser(user_details:any): Observable<any>{
    return this.apiService.post(this.user_url, user_details);
  }

  // get data of individual user
  singleUser(id:any): Observable<any>{
    return this.apiService.get(this.user_url+id);
  }

  //update data of individual user
  editUser(user_details:any, id:any): Observable<any>{
    return this.apiService.put(this.user_url+user_details, id);
  }

  //delete user
  deleteUser(id:any): Observable<any>{
    return this.apiService.delete(this.user_url+id);
  }
}
