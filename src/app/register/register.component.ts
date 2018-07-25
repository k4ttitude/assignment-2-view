import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../model/user';
import { File } from '../model/file';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user:User;
  file: any;
  avatar: File;


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  	this.user = new User();
    this.user.type_id = "Student"; // Student by default
  }

  register(event) {
  	event.preventDefault();
  	
  	var reader = new FileReader();
  	reader.onload = this._handleReaderLoaded.bind(this);
  	
  	if (this.file) {
      // Save with avatar
  		reader.readAsBinaryString(this.file);	
  	} else {
  		// Save without avatar
      var avatar = new File();
      avatar.encode = 'base64';
      avatar.type = "image/jpg";
      avatar.extension = "jpg";
      this.user.avatar = avatar;
  		this.userService.saveUser(this.user);
      this.router.navigate(['/login']);
  	}
  	
  }

  _handleReaderLoaded(readerEvt) {
  	var binaryString = readerEvt.target.result;
  	
  	var avatar = new File();
  	avatar.data = btoa(binaryString);
  	avatar.encode = 'base64';
  	avatar.type = this.file.type;
  	avatar.extension = this.file.type.split("/")[1];

  	this.user.avatar = avatar;

  	// Save user
  	this.userService.saveUser(this.user);
    this.router.navigate(['/login']);
  }

  fileChange(event) {
  	this.file = event.target.files[0];
  	// console.log(this.file);
  }

}
