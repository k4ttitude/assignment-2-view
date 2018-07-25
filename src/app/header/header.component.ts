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
  query: string;

  constructor(private auth: AuthService, private router: Router) {
    auth.sessionSub.subscribe(evt => {
      this.user = auth.user;
    })
  }

  ngOnInit() {
  }

  logout() {
    this.auth.user = null;
    this.router.navigate(['/login']);
  }

  search() {
    console.log(this.query);
    sessionStorage.setItem('query', this.query);
    this.router.navigate(['/feed']);
  }

}