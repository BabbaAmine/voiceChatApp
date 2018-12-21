import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ChatAppServiceProvider} from "../../providers/chat-app-service/chat-app-service";


@IonicPage()
@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {

  user:any;
  iduser:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public chatAppService: ChatAppServiceProvider) {
    this.iduser = this.navParams.get('iduser');
    this.chatAppService.getUserDetails(this.iduser).subscribe(res=>{
      this.user = res;
    },error=>{
      console.log(error);
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
  }

}
