import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/environment';
import { Trecho } from '../models/trecho';



@Injectable({
  providedIn: 'root'
})
export class TrechosService {
  private apiDotNet = environment.dotnetApi + 'api/trechos';

  constructor(private http: HttpClient) { }

  getTrechos(): Observable<Trecho[]> {
    return this.http.get<Trecho[]>(this.apiDotNet, { withCredentials: true });
  }

  getTrechosById(id: number): Observable<Trecho> {
    return this.http.get<Trecho>(`${this.apiDotNet}/${id}`, { withCredentials: true });
  }

  getTrechosByDocumentoId(id: number, page: number = 1, pageSize: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiDotNet}/documento/${id}?page=${page}&pageSize=${pageSize}`, { withCredentials: true });
  }


  postTrechos(trechos: Trecho): Observable<Trecho> {
    return this.http.post<Trecho>(this.apiDotNet, trechos, { withCredentials: true });
  }

  putTrechos(id: number, updatedTrecho: Trecho): Observable<void> { // Altere 'void' para 'any'
    return this.http.put<void>(`${this.apiDotNet}/${id}`, updatedTrecho, { withCredentials: true}); // Altere 'void' para 'any'
  }

  deleteTrechos(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiDotNet}/${id}`, { withCredentials: true });
  }
}
