import { Injectable } from '@angular/core';
import { Http, Headers, } from '@angular/http';
import 'rxjs/add/operator/map';
import {ConfigService} from "../config.service";

export class ChatMessage {
    idmsg: string;
    senderId: string;
    idRoom: string;
    message: string;
    created: string;
}

@Injectable()
export class ChatAppServiceProvider {

  private _urlAddMsgToRoom="/addMsgToRoom/";
  private _urlgetRoomMsgs="/getRoomMsgs/";
  private  _urlgetUserRooms="/getUserRooms/";
  private _urlGetUsers="/getAllUsers/";
  private _urlgetUserDetail="/getUserDetails/";
  private _urlgetRoomDetails="/getRoomDetails/";

  constructor(public _http:Http,private _config: ConfigService) {
    console.log('Hello ChatAppServiceProvider Provider');
  }

    private _buildAuthHeaders() {
        const headers = new Headers();
        headers.append("Content-Type", 'application/json');
        return headers;
    }
    private _buildAuthHeadersWithToken() {
        const headers = new Headers();
        headers.append("Content-Type", 'application/json');
        headers.append("Authorization", 'JWT '+localStorage.getItem('accessToken'));
        return headers;
    }

    getUserRooms(data){
        const url = this._config.baseUrl + this._urlgetUserRooms+data.iduser;
        return this._http.get(url, {headers: this._buildAuthHeaders()}).map(res => res.json());
    }

    addMsgToRoom(data){
        const url = this._config.baseUrl + this._urlAddMsgToRoom;
        return this._http.post(url,
            {
                idRoom: data.idRoom,
                senderId:data.senderId,
                message:data.message,
            }, {
                headers: this._buildAuthHeaders()
            });
    }

    getRoomMsgs(data){
        const url = this._config.baseUrl + this._urlgetRoomMsgs+data.idroom;
        return this._http.get(url, {headers: this._buildAuthHeaders()}).map(res => res.json());
    }

    getusersBy(){
        const url = this._config.baseUrl + this._urlGetUsers;
        return this._http.get(url, {headers: this._buildAuthHeaders()}).map(res => res.json());
    }

    getUserDetails(id){
        const url = this._config.baseUrl + this._urlgetUserDetail+id;
        return this._http.get(url, {headers: this._buildAuthHeaders()}).map(res => res.json());
    }

    getRoomdetails(data){
        const url = this._config.baseUrl + this._urlgetRoomDetails+data.idroom+'/'+localStorage.getItem('pk');
        return this._http.get(url, {headers: this._buildAuthHeaders()}).map(res => res.json());
    }

}
