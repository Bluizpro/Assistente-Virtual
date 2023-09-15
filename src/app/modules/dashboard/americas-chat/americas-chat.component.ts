import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Router } from '@angular/router';
import { DialogflowService,  } from 'src/app/services';

export interface Chat {
  id: number;
  mensagem: Message;
  pergunta?: string;
  payload?: any; // Adicione a propriedade payload
}
export interface Message {
  mensagem: string;
  enviador: string;
  trechos?: Number[];
  isPending?: boolean;
  numeroResposta?: number | null;
  linkResposta?: string;
}

@Component({
  selector: 'app-unineves-chat',
  templateUrl: './americas-chat.component.html',
  styleUrls: [
    './americas-chat.component.scss',
    './americas-chat.component-section.scss',
  ],
})
export class AmericasChatComponent {
  aberto = false;
  message = '';
  numeroResposta = 0;
  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  constructor(
    private dialogFlowService: DialogflowService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  chat: Chat[] = [
    {
      id: 1,
      mensagem: {
        mensagem:
          'Olá sou um assistente virtual desenvolvido por Bruno Perez, gostaria de mais alguma informação sobre o desenvolvedor?',
        enviador: 'bot',
      },
    },
  ];
  listConteudoToIdsParams(trechosIds: Number[] | undefined): string {
    if (!trechosIds) return '';
    const print = trechosIds.join(',');
    return print;
  }
  toggleChat() {
    this.aberto = !this.aberto;
  }

  sendMessageBot() {
    if (this.isValidMessage()) {
      const chatId = this.chat.length + 1;
      const userMessage = this.createUserMessage(chatId, this.message);
      this.chat.push(userMessage);


      const pendingMessage = this.createPendingMessage(
        chatId + 1,
        this.message
      );
      this.chat.push(pendingMessage);

      this.dialogFlowService.detectIntent(this.message).subscribe(
        (response: any) => {
          const botMessage = this.processDialogFlowResponse(response);
          this.updatePendingMessage(botMessage);
        },
        (error: any) => {
          console.error('Erro no componente:', error);
          const errorMessage = this.createErrorMessage(
            'Desculpe, Conexão perdida, tente novamente'
          );
          this.updatePendingMessage(errorMessage);
        }
      );

      this.message = '';
      this.scrollToBottom();
    }
  }

  createUserMessage(id: number, message: string) {
    return {
      id,
      mensagem: {
        mensagem: message,
        enviador: 'user',
      },
    };
  }

  createPendingMessage(id: number, mensagem: string) {
    return {
      id,
      mensagem: {
        mensagem: '{...}',
        enviador: 'bot',
        isPending: true,
      },
      pergunta: mensagem,
    };
  }

  processDialogFlowResponse(response: any) {
    let chat = null;

    if (response) {
      const resposta = response.Response;
      const pergunta = response.Query;

      const linkResposta = response.Link; // Adicione a propriedade Link à resposta do bot, caso exista
      chat = this.criadorChat(resposta, 'bot', true, pergunta, linkResposta);
    } else {
      chat = this.criadorChat(response.responseMessage, 'bot');
    }

    return chat;
  }




  updatePendingMessage(newMessage: Chat) {
    const pendingIndex = this.chat.findIndex(
      (c) => c.mensagem.isPending === true
    );
    if (pendingIndex > -1) {
      this.chat.splice(pendingIndex, 1, newMessage);
      console.log('chat', this.chat);
    }
  }

  createErrorMessage(text: string) {
    return this.criadorChat(text, 'bot');
  }

  criadorChat(
    message: string,
    enviador: string,
    isNumeracao?: boolean,
    pergunta?: string,
    linkResposta?: string // Adicione o parâmetro linkResposta
  ) {
    const chat: Chat = {
      id: this.chat.length + 1,
      mensagem: {
        mensagem: message,
        enviador: enviador,
        linkResposta: linkResposta, // Defina a propriedade linkResposta
      },
      pergunta: pergunta,
    };

    return chat;
  }


  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop =
        this.chatContainer?.nativeElement?.scrollHeight;
    } catch (err) {
      console.log(err);
    }
  }

  isValidMessage(): boolean {
    return this.message.length > 0;
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  makeUrlsClickable(response: string): SafeHtml {
    const urlPattern = /((http|https):\/\/[^\s]+)/g;
    const responseWithLinks = response.replace(
      urlPattern,
      (url) => `<a href="${url}" target="_blank">${url}</a>`
    );

    return this.sanitizer.bypassSecurityTrustHtml(responseWithLinks);
  }
}
