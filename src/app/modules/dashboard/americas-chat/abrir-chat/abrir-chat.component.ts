import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-abrir-chat',
  templateUrl: './abrir-chat.component.html',
  styleUrls: ['./abrir-chat.component.scss']
})
export class AbrirChatComponent {


  @Output() abrirOuFecharChat: EventEmitter<void> = new EventEmitter<void>();

  fecharChat() {
    this.abrirOuFecharChat.emit();
  }

}
