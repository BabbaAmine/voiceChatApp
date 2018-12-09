import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { MyApp } from './app.component';
import { HTTP } from '@ionic-native/http';
import { HttpModule } from '@angular/http';
import { HomePage } from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import {IonicStorageModule} from "@ionic/storage";
import { Facebook } from '@ionic-native/facebook';
import {ConfigService} from "../providers/config.service";
import { ChatAppServiceProvider } from '../providers/chat-app-service/chat-app-service';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
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
  ]
})
export class AppModule {}
