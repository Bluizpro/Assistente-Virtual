import { Injectable } from "@angular/core";
import { environment } from "../enviroments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class DialogflowService {
  url = environment.nodeDialogFlowUrl;

  constructor(private http: HttpClient) {}

  public detectIntent(query: string): any {
    const body = { text: query };
    try {
      return this.http.post<any>(this.url + 'requestText', body);
    } catch (error: any) {}
  }
}
