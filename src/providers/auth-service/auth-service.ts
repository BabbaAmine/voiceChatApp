import { Injectable } from '@angular/core';
import { Http, Headers, } from '@angular/http';
import 'rxjs/add/operator/map';
import { ConfigService } from '../config.service';




@Injectable()
export class AuthServiceProvider {

  private _urlSignUp = "/rest-auth/registration/";
  private _urlLogin = "/rest-auth/login/";

  access: boolean;
  token: string;

  constructor(public http: Http,private _config: ConfigService,private _http: Http) {

  }

    private _buildAuthHeaders() {
        const headers = new Headers();
        headers.append("Content-Type", 'application/json');
        return headers;
    }

    login(credential){
        const url = this._config.baseUrl + this._urlLogin;
        return this._http.post(url,
            {
                username: credential.username,
                password:credential.password,
            }, {
                headers: this._buildAuthHeaders()
            });
    }

    signUp(credential){
        const url = this._config.baseUrl + this._urlSignUp;
        return this._http.post(url,
            {
                username: credential.username,
                password1:credential.password,
                password2: credential.confirmation_password,
                email: credential.email,
            }, {
                headers: this._buildAuthHeaders()
            });
    }

}
