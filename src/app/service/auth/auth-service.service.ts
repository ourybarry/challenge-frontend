import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  //Redirect url in case of successful authentication
  redirectUrl: string = '/home/explore';

  constructor(private cookieService: CookieService, private router: Router, private jwtHelper: JwtHelperService) { }

  isAuthenticated(): boolean{
    //A user is authenticated if he has a jwt token saved and that token is not expired
    return this.cookieService.check('jwt') && !this.jwtHelper.isTokenExpired();
  }
  
  saveToken(token: any){
    // this.cookieService.deleteAll() //we are replacing old credentials with new ones
    this.cookieService.set('jwt', token)
    const decodedToken = this.jwtHelper.decodeToken(token);
    console.log(decodedToken)
    //We save basic user info in our cookies
    this.cookieService.set('user_email', decodedToken.user.email)
    this.cookieService.set('user_id', decodedToken.user.id)
    //Redirect after saving token
    console.log('redirecting')
    this.router.navigateByUrl(this.redirectUrl);
  }
  removeToken(){
    this.cookieService.delete('jwt')
    window.location.reload() //We refresh the page so the user will be redirected to login route
  }
}
