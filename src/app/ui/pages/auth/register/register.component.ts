import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/http/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    passwordConfirm: new FormControl('')
  })

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    const data = this.registerForm.value;
    this.loginService.register(data.email, data.password, data.passwordConfirm).subscribe({
      next: (registerResult)=>{
        //On registration success redirect to login page
        this.router.navigateByUrl('/auth/login')
      },
      error: (error)=>{
        console.log(error)
      }
    })
  }

}
