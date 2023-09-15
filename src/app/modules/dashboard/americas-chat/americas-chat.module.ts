import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbrirChatComponent } from './abrir-chat/abrir-chat.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { americasChatRoutingModule } from './americas-chat-routing.module';

import { AmericasChatComponent,  } from './americas-chat.component';
import { DialogflowService } from 'src/app/services/dialogflow.service';



@NgModule({
  declarations: [AmericasChatComponent,AbrirChatComponent],
  imports: [
    CommonModule,
  americasChatRoutingModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [DialogflowService]
})
export class AmericasChatModule { }
