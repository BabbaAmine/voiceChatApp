import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {MessageriePage} from "../pages/messagerie/messagerie";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  token:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

      this.token=localStorage.getItem('accessToken');
      if (this.token) {
          this.rootPage = MessageriePage;
      }
      else {
          this.rootPage = HomePage;
      }
  }
}

