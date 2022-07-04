import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  
  constructor(private authService: AuthServiceService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    //If user is authenticated let him access the resource
    if(this.authService.isAuthenticated()){
      return true;
    }
    //Otherwise we redirect him to login route after saving the url he was trying to access
    this.authService.redirectUrl = state.url;
    return this.router.parseUrl('/auth/login');
  }
  
}
