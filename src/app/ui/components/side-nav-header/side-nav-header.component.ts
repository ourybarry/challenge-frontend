import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthServiceService } from 'src/app/service/auth/auth-service.service';

@Component({
  selector: 'app-side-nav-header',
  templateUrl: './side-nav-header.component.html',
  styleUrls: ['./side-nav-header.component.css']
})
export class SideNavHeaderComponent implements OnInit {


  user = '';

  constructor(private cookieService: CookieService, private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.user = this.cookieService.get('user_email')
  }

  logout(){
    this.authService.removeToken();
  }

}
