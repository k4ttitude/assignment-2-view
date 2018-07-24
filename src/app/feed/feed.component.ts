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

  docs: Document[];
  content: File;

  constructor(private documentService: DocumentService, private _domSanitizer: DomSanitizer) { }

  ngOnInit() {
  	this.search();
  }

  public search(): void {
  	this.documentService.getDocuments().subscribe(_json => {
      this.docs = _json;
      for (let doc of this.docs) {
        doc.content.safeSource = this._domSanitizer.bypassSecurityTrustResourceUrl(
          'data:' + doc.content.type + ';' + doc.content.encode + ',' + doc.content.data.toString());
      }
  	});
  }

}
