import { Component, OnInit } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { User} from '../model/user';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private users: User[];

  constructor(private userService: UserService, private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  	this.search();
  }

  public search(): void {
  	this.userService.getUsers().subscribe(_json => {
  		this.users = _json;
  	});
  }

  login(event) {
    event.preventDefault();

    const target = event.target;
    const username = target.querySelector('#username').value;
    const password = target.querySelector('#password').value;

    let result = this.authService.validateLogin(username, password).subscribe(data => {
      if (data) {
        this.authService.setLoggedIn(true);
        let user = new User();
        user.username = username;
        this.userService.getUsersByEg(user).subscribe(_json => {
          user = _json[0];
          this.authService.setUser(user);
          this.router.navigate(['/profile']);
        });
      } else {
        window.alert('Username or password is wrong.');
      }
    });
  }

  logout() {
    this.authService.setLoggedIn(false);
    this.authService.setUser(null);
  }

}
