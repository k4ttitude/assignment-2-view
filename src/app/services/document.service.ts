import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Document } from '../model/document';


@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private getDocs_url = '/doc/getDocuments';
  private getDocsByEg_url = '/doc/getDocumentsByEg';
  private saveDoc_url= '/doc/saveDocument';

  constructor(private _http: Http) { }

  public getDocuments(): Observable<any> {
  	var request_url = environment.swd.apiHost + this.getDocs_url;
	  return this._http.get(request_url).pipe(
      map((res: Response) => res.json()));
  }

  public getDocumentsByEg(doc: Document): Observable<any> {
  	var request_url = environment.swd.apiHost + this.getDocsByEg_url;

  	return this._http.post(request_url, doc).pipe(
  		map((res: Response) => res.json()));
  }

  public saveDocument(doc: Document):void {
    var request_url = environment.swd.apiHost + this.saveDoc_url;
    this._http.put(request_url, doc).subscribe(
      (res: Response) => console.log(res));
  }

}
