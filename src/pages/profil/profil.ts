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
      this.user = res.user;
      console.log(this.user);
    },error=>{
      console.log(error);
    })

    this.user = {
      name: 'Cosima Niehaus',
      profileImage: 'assets/img/avatar/girl-avatar.png',
      coverImage: 'assets/img/background/background-5.jpg',
      occupation: 'Designer',
      location: 'Seattle, WA',
      description: 'Passionate Designer. Recently focusing on developing mobile hybrid apps and web development.',
      address: '27 King\'s College Cir, Toronto, ON M5S, Canada',
      phone: '555 555 555',
      email: 'cosima@niehaus.com',

    };

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
  }

}