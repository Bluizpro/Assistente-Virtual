import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroments/environment';
import { Prompt } from 'src/app/models/prompt';
import { Trecho } from 'src/app/models/trecho';


@Injectable({
  providedIn: 'root'
})
export class PromptService {
  private apiDotNet = environment.dotnetApi + 'api/prompt'; 

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<Prompt> {
    return this.http.get<Prompt>(`${this.apiDotNet}/${id}`, { withCredentials: true });
  }

  put(id: number, prompt: Prompt): Observable<Prompt> { 
    return this.http.put<Prompt>(`${this.apiDotNet}/${id}`, prompt, { withCredentials: true}); 
  }
}