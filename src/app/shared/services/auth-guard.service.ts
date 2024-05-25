import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

//admin before login check
@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuardLogin implements CanActivate {
  constructor(private router: Router) {}

  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean {
    let role = sessionStorage.getItem('role');
    if (role === 'admin') {
      // Allow access for admin role
      return true;
    } else {
      // Redirect and allow access to the originally intended route
      this.router.navigate(['/admin-dashboard']);
      return true; // Important change to allow access after redirection
    }
  }
}

//Admin after login check
@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuardService {
  constructor(private router: Router) {}

  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean {
    const role = sessionStorage.getItem('role');
    if (role === 'admin') {
      return true; // Allow access for admin role
    }

    this.router.navigate(['/admin-login']);
    return false; // Deny access for non-admin roles
  }
}


//Customer (buyer & seller) before login check
@Injectable({
  providedIn: 'root',
})
export class SellerBuyerAuthGuardLogin implements CanActivate {
  constructor(private router: Router) {}

  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean {
    const role = sessionStorage.getItem('role');
    switch (role) {
      case 'seller':
        this.router.navigate(['/seller-dashboard']);
        return false;
      case 'buyer':
        this.router.navigate(['/buyer-dashboard']);
        return false;
      default:
        return true;
    }
  }
}


//Buyer after login check
@Injectable({
  providedIn: 'root',
})
export class BuyerAuthGuardService {
  constructor(private router: Router) {}

  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean {
    const role = sessionStorage.getItem('role');
    if (role === 'buyer') {
      return true; // Allow access for buyer role
    }

    this.router.navigate(['/sign-in']);
    return false; // Deny access for non-buyer roles
  }
}


//Seller after login check
@Injectable({
  providedIn: 'root',
})
export class SellerAuthGuardService {
  constructor(private router: Router) {}

  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean {
    const role = sessionStorage.getItem('role');
    if (role === 'seller') {
      return true; // Allow access for seller role
    }

    this.router.navigate(['/sign-in']);
    return false; // Deny access for non-seller roles
  }
}
