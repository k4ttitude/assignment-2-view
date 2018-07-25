import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  uploadType: number;

  DOCUMENT = 1;
  AVATAR = 2;

  constructor(private auth: AuthService, private docService: DocumentService,
  				private userService: UserService, private _sanitizer: DomSanitizer) { }

  ngOnInit() {
  	this.user = JSON.parse(sessionStorage.getItem('user'));
    if (this.user.avatar && this.user.avatar.data) {
      this.user.avatar.safeSource = this._sanitizer.bypassSecurityTrustResourceUrl(
        'data:' + this.user.avatar.type + ';' + this.user.avatar.encode 
        + ',' + this.user.avatar.data);  
    }

	  let doc = new Document();
  	doc.authorId = this.user.id;
  	this.docService.getDocumentsByEg(doc).subscribe(_json => {
  		this.docs = _json;
  	});

    console.log(this.user);
  }

  upload(event) {
  	event.preventDefault();

    this.uploadType = this.DOCUMENT;

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
  	
    // Upload Document
    if (this.uploadType == this.DOCUMENT) {
    	this.document.content = content;
    	this.document.status = 'active';
    	this.document.authorId = this.user.id;

    	this.docService.saveDocument(this.document);
    }

    // Upload Avatar
    if (this.uploadType == this.AVATAR) {
      this.userService.getUserById(this.user.id.toString()).subscribe(_json => {
        let u: User = _json;
        u.avatar = content;
        this.userService.saveUser(u);
        this.auth.user = u;
      });
    }
  }

  fileChange(event) {
  	this.file = event.target.files[0];
  }

  uploadAvatar(event) {
    event.preventDefault();

    this.uploadType = this.AVATAR;

    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(this.file);
  }

}
