import { Injectable } from "@angular/core";
import { ApiService } from "../../core/service/api.service";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  private single_product_id = new BehaviorSubject(null);
  currentProduct = this.single_product_id.asObservable();

  public user_url = "http://localhost:3000/user/";
  public product_url = "http://localhost:3000/products/";
  public order_url = "http://localhost:3000/orders/";

  constructor(private apiService: ApiService) {}

  allProduct(): Observable<any> {
    return this.apiService.get(this.product_url);
  }

  quickBuyProduct(product_id: any) {
    return this.single_product_id.next(product_id);
  }

<<<<<<< HEAD
  individualProduct(product_id: any) {
    return this.apiService.get(this.product_url + product_id);
=======
  individualProduct(product_id:any){
    return this.apiService.get(this.product_url+product_id);
>>>>>>> 9e03fb8cdd860c19dc473781f22de11a2f7fe6f1
  }

  userDetail(product_id: any) {
    return this.apiService.get(this.user_url + product_id);
  }

  insertNeworder(order_details: any): Observable<any> {
    return this.apiService.post(this.order_url, order_details);
  }

  orderDashboardData(): Observable<any> {
    return this.apiService.get(this.order_url);
  }

  productDashboardData(): Observable<any> {
    return this.apiService.get(this.product_url);
  }
}
