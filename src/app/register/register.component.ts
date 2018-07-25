import { Component, OnInit } from '@angular/core';

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


  constructor(private userService: UserService) { }

  ngOnInit() {
  	this.user = new User();
  }

  register(event) {
  	event.preventDefault();
  	
  	var reader = new FileReader();
  	reader.onload = this._handleReaderLoaded.bind(this);
  	
  	if (this.file) {
  		reader.readAsBinaryString(this.file);	
  	} else {
  		// Save without avatar
  		this.userService.saveUser(this.user);
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
  }

  fileChange(event) {
  	this.file = event.target.files[0];
  	// console.log(this.file);
  }

}
