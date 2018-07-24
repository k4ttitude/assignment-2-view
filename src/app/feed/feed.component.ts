import { Component, OnInit } from '@angular/core';

import { DocumentService } from '../services/document.service';
import { Document } from '../model/document';
import { File } from '../model/file';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  doc: File;
  safeSource: SafeResourceUrl;

  constructor(private documentService: DocumentService, private _domSanitizer: DomSanitizer) { }

  ngOnInit() {
  	this.search();
  }

  public search(): void {
  	this.documentService.getDocuments().subscribe(_json => {
  		this.doc = _json[0].content;
  		let source: string = 'data:' + this.doc.type + '/' + this.doc.extension
  			+ ';' + this.doc.encode + ',' + this.doc.data;
  		this.doc.safeSource = this._domSanitizer.bypassSecurityTrustResourceUrl(source);
  	});
  }

}
