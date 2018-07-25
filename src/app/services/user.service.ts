import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private getUsers_url = '/user/getUsers';
  private getUserById_url = '/user/getUser/';
  private getUsersByEg_url = '/user/getUsersByEg';
  private saveUser_url = '/user/saveUser';

  constructor(private _http: Http) { }

  public getUsers(): Observable<any> {
  	var request_url = environment.swd.apiHost + this.getUsers_url;
	return this._http.get(request_url).pipe(
		map((res: Response) => res.json()));
  }

  public getUserById(userId: string): Observable<any> {
  	var request_url = environment.swd.apiHost + this.getUserById_url + userId;
  	return this._http.get(request_url).pipe(
  		map((res: Response) => res.json()));
  }

  public getUsersByEg(user: User): Observable<any> {
  	var request_url = environment.swd.apiHost + this.getUsersByEg_url;

  	return this._http.post(request_url, user).pipe(
  		map((res: Response) => res.json()));
  }

  public saveUser(user: User) {
    var request_url = environment.swd.apiHost + this.saveUser_url;

    this._http.put(request_url, user).subscribe(_result => {
      console.log(_result);
    })
  }

}
