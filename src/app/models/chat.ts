export interface Chat {
    id: number;
    mensagem: Message;
    pergunta?: string;
}
export interface Message {
    mensagem: string;
    enviador: string;
    conteudos?: Number[];
    isPending?: boolean;
    numeroResposta?: number | null;
}