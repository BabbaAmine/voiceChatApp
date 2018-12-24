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
  private _urlgetUserfreinds="/getUsersFreinds/";
  private _urlAddFriend="/addFreind/";
  private _urlAcceptFriend="/accept_ignore_Freind/";
  private _urlAddRoom="/addRoom/";

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

    getuserFreinds(data){
        const url = this._config.baseUrl + this._urlgetUserfreinds+data.iduser;
        return this._http.get(url, {headers: this._buildAuthHeaders()}).map(res => res.json());
    }

    addFriend(data){
        const url = this._config.baseUrl + this._urlAddFriend;
        return this._http.post(url,
            {
                senderId: data.senderid,
                receiverId:data.receiverid,
                statut:2,
            }, {
                headers: this._buildAuthHeaders()
            });
    }

    addRoom(data){
        const url = this._config.baseUrl + this._urlAddRoom;
        return this._http.post(url,
            {
                idUser1: data.iduser1,
                idUser2:data.iduser2,
            }, {
                headers: this._buildAuthHeaders()
            });
    }

    acceptfriend(data){
        const url = this._config.baseUrl + this._urlAcceptFriend+data.id;
        return this._http.put(url,
            {
                senderId: data.senderid,
                receiverId:data.receiverid,
                statut:'1'
            }, {
                headers: this._buildAuthHeaders()
            });
    }

}
