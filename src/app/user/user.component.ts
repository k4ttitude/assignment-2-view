import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../model/user';
import { Document } from '../model/document';
import { UserService } from '../services/user.service';
import { DocumentService } from '../services/document.service';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userSerice: UserService,
  				private docService: DocumentService) { }

  private id: string;
  user: User;
  docs: Document[];

  ngOnInit() {
  	this.route.params.subscribe(params => {
  		this.id = params['id'];
  		this.userSerice.getUserById(this.id).subscribe(_json => {
  			this.user = _json;
  		});

  		let d = new Document();
  		d.authorId = this.id;
  		this.docService.getDocumentsByEg(d).subscribe(_docs => {
  			this.docs = _docs;
  		})
  	});
  }

}
