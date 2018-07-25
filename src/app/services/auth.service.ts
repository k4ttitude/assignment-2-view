import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private login_url = '/user/login';

  private loggedInStatus = false;
  private username;

  constructor(private httpClient: HttpClient) { }

  setLoggedIn(value: boolean) {
  	this.loggedInStatus = value;
  }

  get isLoggedIn() {
  	return this.loggedInStatus;
  }

  setUsername(value: string) {
    this.username = value;
  }

  getUsername() {
    return this.username;
  }

  validateLogin(username, password):Observable<any> {
  	return this.httpClient.post(environment.swd.apiHost + this.login_url, null,
  		{
  			headers: { 'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
  			params: { username: username, password: password }
  		});
  }

}