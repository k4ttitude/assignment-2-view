import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { BaseService } from './services/base.service';
import { User } from './model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: BaseService, private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    var user:User = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
    	return true;
    } else {
    	this.router.navigate(['/login']);
    	return false;
    }
  }
}
