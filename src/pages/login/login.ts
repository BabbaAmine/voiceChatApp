// import { FormBuilder, FormControl, Validator } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { AlertController, App, LoadingController, NavController, Slides, IonicPage } from 'ionic-angular';
import {MessageriePage} from "../messagerie/messagerie";
import { Camera } from '@ionic-native/camera';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  base64Image:any;
  public loginForm: any;
  createSuccess = false;
  public backgroundImage = 'assets/imgs/background/background-6.jpg';
  credential={username:'',password:''};
  registerCredentials= { username: '', email: '', password: '',first_name:'',last_name:'', confirmation_password: '' };

  constructor(
    public loadingCtrl: LoadingController,private auth: AuthServiceProvider,public camera:Camera,
    public alertCtrl: AlertController,private nav: NavController,
    public navCtrl: NavController,
    public app: App
  ) { this.base64Image='../assets/imgs/avatar.png'; }

  // Slider methods
  @ViewChild('slider') slider: Slides;
  @ViewChild('innerSlider') innerSlider: Slides;

  goToLogin() {
    this.slider.slideTo(1);
  }

  goToSignup() {
    this.slider.slideTo(2);
  }

  slideNext() {
    this.innerSlider.slideNext();
  }

  slidePrevious() {
    this.innerSlider.slidePrev();
  }

  presentLoading(message) {
    const loading = this.loadingCtrl.create({
      duration: 500
    });

    loading.onDidDismiss(() => {
      const alert = this.alertCtrl.create({
        title: 'Success',
        subTitle: message,
        buttons: ['Dismiss']
      });
      alert.present();
    });

    loading.present();
  }

  login() {
    //this.presentLoading('Thanks for signing up!');
    if(this.credential.username != ''  && this.credential.password != ''){
      this.auth.login(this.credential).subscribe(data=>{
        let result = data.json();
        console.log(result)
        localStorage.setItem('pk',result.user.pk);
        localStorage.setItem('accessToken',result.token);
        localStorage.setItem('email',result.user.email);
        localStorage.setItem('fistname',result.user.first_name);
        localStorage.setItem('lastname',result.user.last_name);
        localStorage.setItem('username',result.user.username);

        this.navCtrl.setRoot(MessageriePage);
      },error=>{
        console.log(error);
      })
    }else{

    }
  }

  signup() {
    this.auth.signUp(this.registerCredentials).subscribe(data => {
        let result = data.json();
        this.navCtrl.push(LoginPage);
        console.log(result);
      },
      error => {
        console.log(error);
      });
    //this.presentLoading('Thanks for signing up!');
  }
  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

  accessGallery(){
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: this.camera.DestinationType.DATA_URL
    }).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,'+imageData;
    }, (err) => {
      console.log(err);
    });
  }

  resetPassword() {
    this.presentLoading('An e-mail was sent with your new password.');
  }
}
