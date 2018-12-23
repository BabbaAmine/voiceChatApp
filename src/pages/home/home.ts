import {LoginPage} from "../login/login";
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Slides } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('slider') slider: Slides;
  slideIndex = 0;
  slides = [
    {
      imageUrl: 'assets/imgs/pages/page1.PNG',
    },
    {
      imageUrl: 'assets/imgs/pages/page2.PNG',
    },
    {

      imageUrl: 'assets/imgs/pages/page3.PNG',
    },
    {
      imageUrl: 'assets/imgs/pages/page4.PNG',
    }
  ];

  constructor(public navCtrl: NavController) { }

  onSlideChanged() {
    this.slideIndex = this.slider.getActiveIndex();
    console.log('Slide changed! Current index is', this.slideIndex);
  }
  signIn() {
    this.navCtrl.push(LoginPage);
  }
  skip() {
    console.log('Skip clicked');
  }

}

