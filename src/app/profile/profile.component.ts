import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { User } from '../model/user';

import { Document } from '../model/document';
import { DocumentService } from '../services/document.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  docs: Document[];

  private user: User;

  constructor(private auth: AuthService, private docService: DocumentService,
  				private userService: UserService) { }

  ngOnInit() {
  	let u = new User();
  	u.username = this.auth.getUsername();
  	this.userService.getUsersByEg(u).subscribe(_json => {
  		this.user = _json[0];

  		let doc = new Document();
	  	doc.authorId = (this.user) ? this.user.id : '';
	  	this.docService.getDocumentsByEg(doc).subscribe(_json => {
	  		console.log("doc json: " + _json);
	  		this.docs = _json;
	  		if (this.docs) console.log(this.docs);
	  	});
  	});

  	
  }

  private getDocuments() {
  }

}
