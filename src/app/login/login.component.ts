import { Component, OnInit } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { User} from '../model/user';
import { UserService } from '../services/user.service';
import { BaseService } from '../services/base.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UserService, 
    private authService: BaseService,
    private router: Router
   ) { 
    authService.sessionSub.subscribe(evt => {
      this.user = authService.user;
    })
  }

  user:User;

  ngOnInit() {
  }

  login(event) {
    event.preventDefault();

    const target = event.target;
    const username = target.querySelector('#username').value;
    const password = target.querySelector('#password').value;

    let result = this.authService.validateLogin(username, password).subscribe(data => {
      if (data) {
        // Do Login
        let u = new User();
        u.username = username;

        // Call service
        this.userService.getUsersByEg(u).subscribe(_json => {
          this.authService.user = _json[0];
          this.router.navigate(['/profile']);
        });

        console.log(u);
      } else {
        window.alert('Username or password is wrong.');
      }
    });
  }

  logout() {
    this.authService.user = null;
    this.user = null;
    // sessionStorage.removeItem('user');
  }

}
