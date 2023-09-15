export interface Prompt {
    id: number;
    prompt: string;
    max_tokens: number;
    temperatura: number;
    quantidade_conteudos?: number;
    engine: string;
    resposta_padrao?: string;
    isModoChat: boolean;
}