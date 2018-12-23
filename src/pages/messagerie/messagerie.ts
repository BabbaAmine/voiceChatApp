import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ChatAppServiceProvider, ChatMessage} from "../../providers/chat-app-service/chat-app-service";
import {ChatRoomPage} from "../chat-room/chat-room";
import {SearchPage} from "../search/search";



@IonicPage()
@Component({
  selector: 'page-messagerie',
  templateUrl: 'messagerie.html',
})
export class MessageriePage {

  rooms=[];
  users=[];


  constructor(public navCtrl: NavController, public navParams: NavParams,private loadingCtrl:LoadingController,public chatAppService: ChatAppServiceProvider,
            ) {

    console.log(localStorage.getItem('pk'));

      let loading = this.loadingCtrl.create({
          content: 'Patienter svp...'
      });
      loading.present();
      this.chatAppService.getUserRooms({iduser:localStorage.getItem('pk')}).subscribe(res=>{
        console.log(res);
        this.rooms=res.list;
        loading.dismiss();
      },error=>{
        loading.dismiss();
        alert(JSON.stringify(error));
      })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessageriePage');
  }

    openRoom(idRoom){
         this.navCtrl.push(ChatRoomPage,{idroom:idRoom});
    }
    openSearchPage(){
       this.navCtrl.push(SearchPage);
    }


}
