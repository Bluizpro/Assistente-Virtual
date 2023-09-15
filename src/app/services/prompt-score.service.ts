import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/app/enviroments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromptScoreService {

  dotnetApiUrl = env.dotnetApi + 'api/webhook';

  constructor(private http: HttpClient) {}

  askQuestion(question: string): Observable<any> {
    const requestBody = { Pergunta: question };
    return this.http.post<any>(this.dotnetApiUrl, requestBody);
  }
  askQuestionScore(question: string): Observable<any> {
    const requestBody = { Pergunta: question };
    return this.http.post<any>(this.dotnetApiUrl+'/score', requestBody);
  }

  webhookMessage(message: string): Observable<any> {
    const requestBody = { Pergunta: message };
    const headers = new HttpHeaders().set('x-api-key', 'chaveAleatoria');
    return this.http.post<any>(this.dotnetApiUrl, requestBody, { headers });
  }
}
