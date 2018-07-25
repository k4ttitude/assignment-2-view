import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { User } from '../model/user';

import { Document } from '../model/document';
import { File } from '../model/file';
import { DocumentService } from '../services/document.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  docs: Document[];
  document: Document = new Document();
  private user: User;
  file: any;

  constructor(private auth: AuthService, private docService: DocumentService,
  				private userService: UserService) { }

  ngOnInit() {
  	this.user = JSON.parse(sessionStorage.getItem('user'));
	  let doc = new Document();
  	doc.authorId = (this.user) ? this.user.id : '';
  	this.docService.getDocumentsByEg(doc).subscribe(_json => {
  		this.docs = _json;
  	});
  }

  upload(event) {
  	event.preventDefault();
  	
  	console.log(JSON.stringify(this.document));

  	var reader = new FileReader();
  	reader.onload = this._handleReaderLoaded.bind(this);
  	reader.readAsBinaryString(this.file);
  }

  _handleReaderLoaded(readerEvt) {
  	var binaryString = readerEvt.target.result;
  	
  	var content = new File();
  	content.data = btoa(binaryString);
  	content.encode = 'base64';
  	content.type = this.file.type;
  	content.extension = this.file.type.split("/")[1];

  	this.document.content = content;
  	this.document.status = 'active';
  	this.document.authorId = this.user.id;

  	console.log(JSON.stringify(this.document));

  	this.docService.saveDocument(this.document);
  }

  fileChange(event) {
  	this.file = event.target.files[0];
  	console.log(this.file);
  }

}
