import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import {LoginPage} from "../login/login";

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private app:App) {
  }

    logout(){
            localStorage.clear();
            this.app.getRootNav().setRoot(LoginPage);
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

}
