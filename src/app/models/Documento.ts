import { Categoria } from "./categoria";

export interface Documento {
    id: number;
    titulo: string;
    categoriaId: number;
    categoria: Categoria
    pdfUrl: string;
    dataPublicacao: string;
    date: Date;
    status: string;
    origem: string;
    isPdf: boolean;
  }

export interface DocumentoPage {
    totalItems: number;
    totalPages: number;
    items: Documento[];
}