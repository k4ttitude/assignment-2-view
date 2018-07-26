import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { DocumentService } from '../services/document.service';
import { Document } from '../model/document';


@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  constructor(private route: ActivatedRoute,
  			private _domSanitizer: DomSanitizer,
  			private docService: DocumentService) { }

  private id: string;
  doc: Document;

  ngOnInit() {
  	this.route.params.subscribe(params => {
  		this.id = params['id'];
  		let doc = new Document();
  		doc.id = this.id;

  		this.docService.getDocumentsByEg(doc).subscribe(_json => {
  			this.doc = _json[0];

          	console.log(this.doc);
  			this.doc.content.safeSource = this._domSanitizer.bypassSecurityTrustResourceUrl(
          	'data:' + this.doc.content.type + ';' + this.doc.content.encode + ',' + this.doc.content.data.toString());
  		});
  	});
  }

}
