import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessageriePage } from './messagerie';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    MessageriePage,
  ],
  imports: [
    IonicPageModule.forChild(MessageriePage),
      PipesModule
  ],
})
export class MessageriePageModule {}
