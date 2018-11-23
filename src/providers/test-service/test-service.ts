import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';

/*
  Generated class for the TestServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TestServiceProvider {

  constructor(private _http: Http) {
    console.log('Hello TestServiceProvider Provider');
  }

  tester() {
    let d = new FormData();
   /* d.append('', '10');*/

    const url = 'http://babba0609.pythonanywhere.com/idealweight';
    return this._http.post(url, {headers: this._buildAuthHeaders()}).map(res => res.json())
  }

  private _buildAuthHeaders() {
    const headers = new Headers();
    headers.append("Content-Type", 'application/json');
    return headers;
  }

}
