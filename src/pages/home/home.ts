import {Component, ViewChild} from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {RegisterPage} from "../register/register";
import {ChatAppServiceProvider} from "../../providers/chat-app-service/chat-app-service";



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('username') uname;
  @ViewChild('password') password;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController ) {

    /*this.chatAppService.getRoomMsgs({idroom:'1'}).subscribe(res=>{
      console.log(res);
    },error=>{
      console.log(error);
    })*/

  }
  signIn() {
    this.navCtrl.push(LoginPage);
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }
}

