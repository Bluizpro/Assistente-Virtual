import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from 'src/app/enviroments/environment';
import { Documento, DocumentoPage } from 'src/app/models';
@Injectable({
  providedIn: 'root',
})
export class DocumentoService {
  dotnetApiUrl = env.dotnetApi + 'api/documento';

  constructor(private http: HttpClient) {}

  updateDocumento(documento: Documento, documentoId: number): Observable<any> {

    documento.id = documentoId;
    return this.http.put(`${this.dotnetApiUrl}/${documentoId}`, documento, {
      withCredentials: true,
    });
  }

  updateTrechoTexto(documento: Documento): Observable<any> {
    const body = {
      id: documento.id,
      texto: null,
    };
    return this.http.put(`${this.dotnetApiUrl}/${documento.id}/texto`, body, {
      withCredentials: true,
    });
  }

  updateDocumentoPdf(documentoId: string, formData: FormData): Observable<any> {
    return this.http.put(`${this.dotnetApiUrl}/${documentoId}/pdf`, formData);
  }

  addDocumentoByText(
    titulo: string,
    texto: string,
    categoriaId: number
  ): Observable<Documento> {
    const body = {
      titulo: titulo,
      texto: texto,
      categoriaId: categoriaId,
    };
    return this.http.post<Documento>(`${this.dotnetApiUrl}/texto`, body, {
      withCredentials: true,
    });
  }

  addDocumentoByPdf(
    titulo: string,
    file: File,
    categoriaId: number,
    pdf_url: string
  ): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('titulo', titulo);
    formData.append('categoriaId', categoriaId.toString());
    formData.append('pdf_url', pdf_url);

    return this.http.post(`${this.dotnetApiUrl}/pdf`, formData, {
      withCredentials: true,
    });
  }

  addDocumentoByLink(
    titulo: string,
    pdfUrl: string,
    categoriaId: number
  ): Observable<Documento> {
    const body = {
      titulo: titulo,
      pdfUrl: pdfUrl,
      categoriaId: categoriaId,
    };
    return this.http.post<Documento>(`${this.dotnetApiUrl}/link`, body, {
      withCredentials: true,
    });
  }

  getDocumentoById(id: number): Observable<any> {
    return this.http.get(`${this.dotnetApiUrl}/${id}`, {
      withCredentials: true,
    });
  }

  getDocumentos(): Observable<Documento[]> {
    return this.http.get<Documento[]>(`${this.dotnetApiUrl}`, {
      withCredentials: true,
    });
  }

  getDocumentosFiltrados(
    titulo?: string,
    categoriaId?: number,
    status?: string,
    origem?: string,
    dataPublicacao?: Date,
    page: number = 1,
    pageSize: number = 10,
    sortDirection?: string,
    sortColumn?: string
  ): Observable<DocumentoPage> {
    let urlParams = '';
    if (titulo) {
      urlParams += `titulo=${encodeURIComponent(titulo)}&`;
    }
    if (categoriaId) {
      urlParams += `categoriaId=${categoriaId}&`;
    }
    if (status) {
      urlParams += `status=${encodeURIComponent(status)}&`;
    }
    if (origem) {
      urlParams += `origem=${encodeURIComponent(origem)}&`;
    }
    if (dataPublicacao) {
      urlParams += `dataPublicacao=${encodeURIComponent(
        dataPublicacao.toString()
      )}&`;
    }
    if (sortColumn) {
      urlParams += `sortColumn=${sortColumn}&`;
    }
    if (sortDirection) {
      urlParams += `sortDirection=${sortDirection}&`;
    }
    urlParams += `page=${page}&pageSize=${pageSize}&`;
    if (urlParams) {
      urlParams = '?' + urlParams.slice(0, -1);
    }
    const urlCompleta = `${this.dotnetApiUrl}/filtrado${urlParams}`;
    return this.http.get<DocumentoPage>(urlCompleta, { withCredentials: true });
  }
}
