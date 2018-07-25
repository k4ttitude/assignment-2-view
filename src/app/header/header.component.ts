import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { User } from '../model/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user:User;

  constructor(private auth: AuthService, private router: Router) {
    auth.sessionSub.subscribe(evt => {
      this.user = auth.user;
      console.log(!this.user);
    })
  }

  ngOnInit() {
  }

  logout() {
    this.auth.user = null;
    this.router.navigate(['/login']);
  }

}