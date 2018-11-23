import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import {RegisterPage} from "../register/register";
import {FacebookLoginResponse} from "@ionic-native/facebook";
import { Facebook} from '@ionic-native/facebook';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild('username') user ;
  @ViewChild('password') password ;
  credential={username:'',password:''};
  base64Image:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public camera:Camera, public fb: Facebook,private auth: AuthServiceProvider ) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

  loginFB()
  {
    // Login with permissions
    this.fb.login(['public_profile', 'user_photos', 'email', 'user_birthday'])
      .then( (res: FacebookLoginResponse) => {

        // The connection was successful
        if(res.status == "connected") {

          // Get user ID and Token
          var fb_id = res.authResponse.userID;
          var fb_token = res.authResponse.accessToken;

          // Get user infos from the API
          this.fb.api("/me?fields=name,gender,birthday,email", []).then((user) => {

            // Get the connected user details
            var gender    = user.gender;
            var birthday  = user.birthday;
            var name      = user.name;
            var email     = user.email;

            console.log("=== USER INFOS ===");
            console.log("Gender : " + gender);
            console.log("Birthday : " + birthday);
            console.log("Name : " + name);
            console.log("Email : " + email);

            // => Open user session and redirect to the next page

          });

        }
        // An error occurred while loging-in
        else {
          console.log("An error occurred...");
        }

      })
      .catch((e) => {
        console.log('Error logging into Facebook', e);
      });
  }

  doLogin(){
      if(this.credential.username != ''  && this.credential.password != ''){
        this.auth.login(this.credential).subscribe(data=>{
          let result = data.json();
          localStorage.setItem('token',result.token);
          localStorage.setItem('user',result.user);
          console.log(result);
        },error=>{
          console.log(error);
        })
      }else{

      }

  }

}
