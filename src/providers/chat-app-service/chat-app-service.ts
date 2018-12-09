import { Injectable } from '@angular/core';
import { Http, Headers, } from '@angular/http';
import 'rxjs/add/operator/map';
import {ConfigService} from "../config.service";

/*
  Generated class for the ChatAppServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatAppServiceProvider {

  private _urlAddMsgToRoom="/addMsgToRoom/";
  private _urlgetRoomMsgs="/getRoomMsgs/";

  constructor(public _http:Http,private _config: ConfigService) {
    console.log('Hello ChatAppServiceProvider Provider');
  }

    private _buildAuthHeaders() {
        const headers = new Headers();
        headers.append("Content-Type", 'application/json');
        return headers;
    }

    addMsgToRoom(data){
        const url = this._config.baseUrl + this._urlAddMsgToRoom;
        return this._http.post(url,
            {
                idRoom: data.idroom,
                senderId:data.senderid,
                message:data.message,
            }, {
                headers: this._buildAuthHeaders()
            });
    }

    getRoomMsgs(data){
        const url = this._config.baseUrl + this._urlgetRoomMsgs+data.idroom;
        return this._http.get(url, {headers: this._buildAuthHeaders()}).map(res => res.json());
    }

}
