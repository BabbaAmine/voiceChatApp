import { Component } from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ChatAppServiceProvider} from "../../providers/chat-app-service/chat-app-service";


@IonicPage()
@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {

  user:any;
  iduser:any;
  relation:any;
  test:boolean;
  friendsTime:any;
  idfriend:any;


  constructor(public navCtrl: NavController, public navParams: NavParams,public chatAppService: ChatAppServiceProvider,
              private loadingCtrl:LoadingController,private events: Events) {
    this.iduser = this.navParams.get('iduser');

    this.chatAppService.getUserDetails(this.iduser).subscribe(res=>{
      this.chatAppService.getuserFreinds({iduser:this.iduser}).subscribe(data=>{
        console.log(data);

           for(let i=0 ;i < data.total ; i++){
             if((data.list[i].senderId == localStorage.getItem('pk') ||
                 data.list[i].receiverId == localStorage.getItem('pk'))){
               if(data.list[i].statut == 0){
                 this.relation =0;
               }else if(data.list[i].statut == 1){
                 this.relation =1;
                 this.friendsTime = data.list[i].created;
               }else if(data.list[i].statut == 2){
                 if(data.list[i].senderId == localStorage.getItem('pk')){
                   this.relation = 2;
                 }else{
                   this.relation = 3;
                   this.idfriend = data.list[i].id;
                   console.log('id friend: '+this.idfriend);
                 }
               }else{
                 this.relation = 4;
               }
               this.test = true;
             }else {
               this.test = false;
             }
          }
          if(this.test == false){
             this.relation =0;
          }
          this.user = res.user;
      });
      //console.log(this.user);
    },error=>{
      console.log(error);
    });
  }

    addFriend(){
        let loading = this.loadingCtrl.create({
            content: 'Patienter svp...'
        });
        loading.present();
        this.chatAppService.addFriend({senderid:localStorage.getItem('pk'),receiverid:this.iduser}).subscribe(res=>{
          console.log(res);

                    this.chatAppService.getuserFreinds({iduser:this.iduser}).subscribe(data=>{
                        console.log(data);

                        for(let i=0 ;i < data.total ; i++){
                            if((data.list[i].senderId == localStorage.getItem('pk') ||
                                data.list[i].receiverId == localStorage.getItem('pk'))){
                                if(data.list[i].statut == 0){
                                    this.relation =0;
                                }else if(data.list[i].statut == 1){
                                    this.relation =1;
                                    this.friendsTime = data.list[i].created;
                                }else if(data.list[i].statut == 2){
                                    if(data.list[i].senderId == localStorage.getItem('pk')){
                                        this.relation = 2;
                                    }else{
                                        this.relation = 3;
                                    }
                                }else{
                                    this.relation = 4;
                                }
                                this.test = true;
                            }else {
                                this.test = false;
                            }
                        }
                        if(this.test == false){
                            this.relation = 0;
                        }
                        loading.dismiss();
                    },error=>{
                        console.log(error);
                    });



            },error=>{
                console.log(error);
            });
    }

    acceptFriend(){

        let loading = this.loadingCtrl.create({
            content: 'Patienter svp...'
        });
        loading.present();
        this.chatAppService.acceptfriend({id:this.idfriend,senderid:this.iduser,receiverid:localStorage.getItem('pk')}).subscribe(res=>{

            this.chatAppService.addRoom({iduser1:this.iduser,iduser2:localStorage.getItem('pk')}).subscribe(res2=>{

                this.chatAppService.getuserFreinds({iduser:this.iduser}).subscribe(data=>{
                    console.log(data);

                    for(let i=0 ;i < data.total ; i++){
                        if((data.list[i].senderId == localStorage.getItem('pk') ||
                            data.list[i].receiverId == localStorage.getItem('pk'))){
                            if(data.list[i].statut == 0){
                                this.relation =0;
                            }else if(data.list[i].statut == 1){
                                this.relation =1;
                                this.friendsTime = data.list[i].created;
                            }else if(data.list[i].statut == 2){
                                if(data.list[i].senderId == localStorage.getItem('pk')){
                                    this.relation = 2;
                                }else{
                                    this.relation = 3;
                                }
                            }else{
                                this.relation = 4;
                            }
                            this.test = true;
                        }else {
                            this.test = false;
                        }
                    }
                    if(this.test == false){
                        this.relation = 0;
                    }
                    loading.dismiss();
                    this.events.publish('refrechMessagerie');
                },error=>{
                    console.log(error);
                });
            },error=>{
                console.log(error);
            });
        },error=>{
            console.log(error);
        })


    }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilPage');
  }

}
