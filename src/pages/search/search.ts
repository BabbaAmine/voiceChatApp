import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ChatAppServiceProvider} from "../../providers/chat-app-service/chat-app-service";
import {ProfilPage} from "../profil/profil";

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
    items: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public chatAppService: ChatAppServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }


    getItems(ev: any) {

        this.chatAppService.getusersBy().subscribe(res=>{
            this.items = res.list;
            const val = ev.target.value;
            if (val && val.trim() != '') {
                this.items = this.items.filter((item) => {
                    return (item.email.toLowerCase().indexOf(val.toLowerCase()) > -1);
                })
            }
        },error=>{
            console.log(error);
        });

    }

    viewProfile(id){
      this.navCtrl.push(ProfilPage,{iduser:id});
    }

}
