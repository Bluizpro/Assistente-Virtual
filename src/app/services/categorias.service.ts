import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment as env} from 'src/app/enviroments/environment';
import { Categoria, CategoriaPage } from 'src/app/models';
@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  // faça update categoria
  dotnetApiUrl = env.dotnetApi + 'api/Categoria';


  //faça get by id 
  constructor(private http: HttpClient) { }


  public update(categoria: Categoria | undefined): Observable<any> {
    return this.http.put(this.dotnetApiUrl + `/${categoria?.id}`, categoria, {withCredentials: true}).pipe(
      catchError(this.handleError<any>('update', null))
    );
  }

  public getById(id: string | null): Observable<Categoria> {
    return this.http.get(`${this.dotnetApiUrl}/${id}`,{withCredentials: true}).pipe(
      map((response: any) => response as Categoria),
      catchError(this.handleError<Categoria>('getById', undefined))
    );
  }

  public get(): Observable<Categoria[]> {
    return this.http.get(this.dotnetApiUrl,{withCredentials: true}).pipe(
      map((response: any) => response as Categoria[]),
      catchError(this.handleError<Categoria[]>('get', []))
    );
  }
  public getFiltradoWithPage(nome?: string, page: number = 1,
    pageSize: number = 10): Observable<CategoriaPage> {

    let urlParams = '';
    if (nome) {
      urlParams += `nome=${encodeURIComponent(nome)}&`;
    }
    urlParams += `page=${page}&pageSize=${pageSize}&`;
    if (urlParams) {
      urlParams = '?' + urlParams.slice(0, -1);
    }

    const urlCompleta = `${this.dotnetApiUrl}/filtrado${urlParams}`;
    return this.http.get<CategoriaPage>(urlCompleta, {withCredentials: true});
  }

  /**
   * Cria uma nova categoria usando a API.
   * @param categoria - A categoria a ser criada.
   * @returns Um Observable com a resposta da API.
   */
  public post(categoria: Categoria): Observable<any> {
    return this.http.post(this.dotnetApiUrl, { nome: categoria.nome }, {withCredentials: true}).pipe(
      catchError(this.handleError<any>('post', null))
    );
  }

  /**
   * Trata os erros das chamadas à API.
   * @param operation - O nome da operação que falhou.
   * @param result - O valor a ser retornado como resultado padrão.
   * @returns Uma função que trata o erro e retorna o resultado padrão.
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} falhou: ${error.message}`);
      return of(result as T);
    };
  }
}