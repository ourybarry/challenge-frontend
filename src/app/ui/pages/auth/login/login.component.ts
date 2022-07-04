import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth/auth-service.service';
import { LoginService } from 'src/app/service/http/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error = '';
  loginForm = new FormGroup({
    email : new FormControl(),
    password: new FormControl()
  })
  constructor(private loginService: LoginService, private authService: AuthServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    const data = this.loginForm.value
    this.loginService.login(data.email, data.password).subscribe({
      next: (loginResult : any)=>{ this.authService.saveToken(loginResult.token) },
      error: (error: HttpErrorResponse)=> { this.error = error.error.error[0] }
    })
  }

}
