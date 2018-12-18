import {Component} from '@angular/core';
import {IonicPage, NavController, AlertController, NavParams} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Camera } from '@ionic-native/camera';
import {LoginPage} from "../login/login";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  createSuccess = false;
  registerCredentials= { username: '', email: '', password: '',first_name:'',last_name:'', confirmation_password: '' };
  base64Image:any;

  constructor(private nav: NavController, private auth: AuthServiceProvider,
              private alertCtrl: AlertController, public camera:Camera,private navCtrl:NavController) {
    this.base64Image='../assets/imgs/avvatar.png';
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

  register() {
        this.auth.signUp(this.registerCredentials).subscribe(data => {
                let result = data.json();
                this.navCtrl.push(LoginPage);
                console.log(result);
            },
            error => {
                console.log(error);
            });
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

}
