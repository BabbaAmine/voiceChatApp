import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ChatAppServiceProvider} from "../../providers/chat-app-service/chat-app-service";
import {ProfilPage} from "../profil/profil";


@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
    items=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public chatAppService: ChatAppServiceProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }


    getItems(ev: any) {
        this.items=[];
        this.chatAppService.getusersBy().subscribe(res=>{
            for(let i = 0 ; i < res.total ; i++){
                if(res.list[i].id != localStorage.getItem('pk') && res.list[i].is_superuser == false){
                    this.items.push(res.list[i]);
                }
            }
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
