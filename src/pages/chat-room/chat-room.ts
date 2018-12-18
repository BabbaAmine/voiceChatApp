import {Component, ElementRef, ViewChild} from '@angular/core';
import {Content, Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import * as moment from "moment";
import {ChatMessage,ChatAppServiceProvider} from "../../providers/chat-app-service/chat-app-service";

@IonicPage()
@Component({
  selector: 'page-chat-room',
  templateUrl: 'chat-room.html',
})
export class ChatRoomPage {

    @ViewChild(Content) content: Content;
    @ViewChild('chat_input') messageInput: ElementRef;
    idRoom:any;
    msgList: ChatMessage[] = [];
    editorMsg = '';
    showEmojiPicker = false;
    currentUserId:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private events: Events,private chatservice: ChatAppServiceProvider) {
      this.idRoom = this.navParams.get('idroom');
      this.currentUserId = localStorage.getItem('pk');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatRoomPage');
  }

    ionViewDidEnter() {
        this.getMsg();

        this.events.subscribe('chat:received', msg => {
            this.pushNewMsg(msg);
        })
    }

    onFocus() {
        this.showEmojiPicker = false;
        this.content.resize();
        this.scrollToBottom();
    }

    switchEmojiPicker() {
        this.showEmojiPicker = !this.showEmojiPicker;
        if (!this.showEmojiPicker) {
            this.focus();
        } else {
            this.setTextareaScroll();
        }
        this.content.resize();
        this.scrollToBottom();
    }

    getMsg() {
        this.chatservice.getRoomMsgs({idroom:this.idRoom }).subscribe(res => {

            this.msgList= res.list;
            console.log(this.msgList);
            this.scrollToBottom();
            this.verifAdminSendMsg();
        });
    }

    verifAdminSendMsg() {
        this.chatservice.getRoomMsgs({idroom: this.idRoom}).subscribe(result => {

            let data = result.list;
            let msgListVerif = this.msgList;
            for (let i = 0; i < data.length; i++) {
                let test = this.verifExistmsg(msgListVerif, data[i].idmsg);

                if (test == false && data[i].senderId != this.currentUserId) {
                    this.msgList.push(data[i]);
                    this.scrollToBottom();
                }
            }
            setTimeout(
                this.verifAdminSendMsg.bind(this)
                , 5000);

        }, error => {
            console.log(error);
        });

    }

    verifExistmsg(msgList, idmsg) {
        let test = false;
        for (let j = 0; j < msgList.length; j++) {
            if (idmsg == msgList[j].idmsg) {
                test = true;
                break;
            }
        }
        if (test == true) {
            return true;
        } else {
            return false;
        }
    }

    sendMsg() {
        if (!this.editorMsg.trim()) return;

        const id = Date.now().toString();
        let newMsg: ChatMessage = {
            idmsg: Date.now().toString(),
            senderId: localStorage.getItem('pk'),
            idRoom: this.idRoom,
            message: this.editorMsg,
            created: moment().format('YYYY-MM-DD hh:mm:ss')
        };

        this.chatservice.addMsgToRoom(newMsg).subscribe(data => {
            console.log(data);
            this.pushNewMsg(newMsg);
            this.editorMsg = '';

        }, error => {
            console.log(error);
        });

    }

    pushNewMsg(msg: ChatMessage) {
        this.msgList.push(msg);
        this.scrollToBottom();
    }

    scrollToBottom() {
        setTimeout(() => {
            if (this.content.scrollToBottom) {
                this.content.scrollToBottom();
            }
        }, 1000)
    }

    private focus() {
        if (this.messageInput && this.messageInput.nativeElement) {
            this.messageInput.nativeElement.focus();
        }
    }

    private setTextareaScroll() {
        const textarea = this.messageInput.nativeElement;
        textarea.scrollTop = textarea.scrollHeight;
    }

}
