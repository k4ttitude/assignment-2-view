import { Component, OnInit } from '@angular/core';

import { DocumentService } from '../services/document.service';
import { Document } from '../model/document';
import { File } from '../model/file';
import { BaseService } from '../services/base.service';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  docs: Document[];
  content: File;
  query: string = '';

  constructor(private documentService: DocumentService,
              private _domSanitizer: DomSanitizer,
              private baseSerVice: BaseService ) {
    this.query = sessionStorage.getItem('query');
    if (this.query == null) this.query = '';
    this.search();
    baseSerVice.sessionSub.subscribe(evt => {
      if (evt == 'query') {
        this.query = baseSerVice.query;
        this.search();
      }
    });
  }

  ngOnInit() {
  }

  public search() {
    this.documentService.findByTitle(this.query).subscribe(_json => {
      this.docs = _json;
      for (let doc of this.docs) {
        doc.content.safeSource = this._domSanitizer.bypassSecurityTrustResourceUrl(
          'data:' + doc.content.type + ';' + doc.content.encode + ',' + doc.content.data.toString());
      }
    });
  }

  like(docId: string) {
    
  }

}
