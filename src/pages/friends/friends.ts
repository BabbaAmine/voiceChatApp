import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ChatAppServiceProvider} from "../../providers/chat-app-service/chat-app-service";
import {ProfilPage} from "../profil/profil";

/**
 * Generated class for the FriendsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {
  friends=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public chatAppService: ChatAppServiceProvider) {

      this.chatAppService.getuserFreinds({iduser:localStorage.getItem('pk')}).subscribe(res=>{
        for(let i = 0 ; i< res.total ; i++){
            if(res.list[i].statut == 1 ){
                if(res.list[i].senderId != localStorage.getItem('pk')){
                    this.chatAppService.getUserDetails(res.list[i].senderId).subscribe(data=>{
                        this.friends.push(data.user);
                    },error=>{
                        console.log(error);
                    })
                }
                if(res.list[i].receiverId != localStorage.getItem('pk')){

                    this.chatAppService.getUserDetails(res.list[i].receiverId).subscribe(data=>{
                        this.friends.push(data.user);
                    },error=>{
                        console.log(error);
                    })
                }
            }

        }
      },error=>{
        console.log(error);
      })
  }
    viewProfile(id){
        this.navCtrl.push(ProfilPage,{iduser:id});
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsPage');
  }

}
