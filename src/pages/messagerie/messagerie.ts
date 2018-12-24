import { Component } from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
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


  constructor(public navCtrl: NavController, public navParams: NavParams,private loadingCtrl:LoadingController,
              public chatAppService: ChatAppServiceProvider,private events: Events) {

      /*refrech user rooms*/
      events.subscribe('refrechMessagerie', data => {
          this.rooms=[];
          let loading = this.loadingCtrl.create({
              content: 'Patienter svp...'
          });
          loading.present();
          this.chatAppService.getUserRooms({iduser:localStorage.getItem('pk')}).subscribe(res=>{
              console.log(res);
              for(let i=0 ; i< res.total ; i++){
                  console.log(res.list[i].idRoom);
                  this.chatAppService.getRoomdetails({idroom:res.list[i].idRoom}).subscribe(data=>{
                      this.rooms.push(data);
                  })
              }
              loading.dismiss();
          },error=>{
              loading.dismiss();
              console.log(JSON.stringify(error));
          })
      });
      /*end refrech*/
      console.log(localStorage.getItem('pk'));
      let loading = this.loadingCtrl.create({
          content: 'Patienter svp...'
      });
      loading.present();
      this.chatAppService.getUserRooms({iduser:localStorage.getItem('pk')}).subscribe(res=>{
        console.log(res);
        for(let i=0 ; i< res.total ; i++){
          console.log(res.list[i].idRoom);
          this.chatAppService.getRoomdetails({idroom:res.list[i].idRoom}).subscribe(data=>{
             this.rooms.push(data);
          })
        }
        loading.dismiss();
      },error=>{
        loading.dismiss();
        //alert(JSON.stringify(error));
      })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessageriePage');
  }

    openRoom(idRoom,Ouser){
         this.navCtrl.push(ChatRoomPage,{idroom:idRoom,Ouser:Ouser});
    }
    openSearchPage(){
       this.navCtrl.push(SearchPage);
    }
}
