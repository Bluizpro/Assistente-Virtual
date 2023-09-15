export interface Categoria {
    id: number;
    nome: string;
}
export interface CategoriaPage {
    totalItems: number;
    totalPages: number;
    items: Categoria[];
}