import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { MyApp } from './app.component';
import { HTTP } from '@ionic-native/http';
import { HttpModule } from '@angular/http';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import {IonicStorageModule} from "@ionic/storage";
import { Facebook } from '@ionic-native/facebook';
import {ConfigService} from "../providers/config.service";
import { ChatAppServiceProvider } from '../providers/chat-app-service/chat-app-service';
import {HomePageModule} from "../pages/home/home.module";
import {LoginPageModule} from "../pages/login/login.module";
import {RegisterPageModule} from "../pages/register/register.module";
import {MessageriePageModule} from "../pages/messagerie/messagerie.module";
import {ChatRoomPageModule} from "../pages/chat-room/chat-room.module";
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    ChatRoomPageModule,
    HomePageModule,
    LoginPageModule,
    RegisterPageModule,
    MessageriePageModule,
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HTTP,
    Camera,
      ConfigService,
    AuthServiceProvider,
    ChatAppServiceProvider,
    TextToSpeech,
    SpeechRecognition,
  ]
})
export class AppModule {}
