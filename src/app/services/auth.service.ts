import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { User } from '../model/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private login_url = '/user/login';
  sessionSub = new Subject();

  set user(value: User) {
    if (value == null) {
      sessionStorage.removeItem('user');
    } else {
      sessionStorage.setItem('user', JSON.stringify(value));  
    }
    this.sessionSub.next(value ? value : 'logout'); // notify all Subscribers about the change
  }

  get user() {
    return JSON.parse(sessionStorage.getItem('user'));
  }

  constructor(private httpClient: HttpClient) { }

  validateLogin(username, password):Observable<any> {
  	return this.httpClient.post(environment.swd.apiHost + this.login_url, null,
  		{
  			headers: { 'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
  			params: { username: username, password: password }
  		});
  }

}