import {Component, ViewChild} from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {RegisterPage} from "../register/register";
import {TestServiceProvider} from "../../providers/test-service/test-service";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('username') uname;
  @ViewChild('password') password;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,private testApi: TestServiceProvider) {

  }
  signIn() {
    this.navCtrl.push(LoginPage);
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }
}

