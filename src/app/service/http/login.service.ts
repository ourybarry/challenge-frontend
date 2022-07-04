import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiBaseUrl = environment.apiBaseUrl + '/api/v1';

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string) {
    return this.httpClient.post(this.apiBaseUrl + '/auth/login', { email, password });
  }

  register(email: string, password: string, passwordConfirm: string){
    return this.httpClient.post(this.apiBaseUrl+'/auth/register', {email, password, 'password_confirm': passwordConfirm});
  }
}
