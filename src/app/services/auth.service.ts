import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as Auth from '../interfaces/auth';
import { LoginResponseError } from '../interfaces/auth';
import { environment } from '../../enviroments/environment';
import LoginResponse = Auth.LoginResponse;
import LoginRequest = Auth.LoginRequest;
import jwt_decode from 'jwt-decode';
import { Usuario } from '../interfaces/user';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';

const STORAGE_KEY = 'loggedUser';

interface AppSession {
  user: Usuario | null;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginResponse: LoginResponse;
  private tokenBehavior$: BehaviorSubject<string | null>;
  usuario$: Observable<Usuario | null>;

  static getToken() {
    return sessionStorage.getItem(STORAGE_KEY);
  }

  constructor(private http: HttpClient, protected router: Router) {
    const savedToken = AuthService.getToken();

    this.tokenBehavior$ = new BehaviorSubject<string | null>(savedToken);

    this.usuario$ = this.tokenBehavior$.pipe(
      map((token) => {

        const jsonToken = token ? jwt_decode(token) : null;
        if (jsonToken) {
          return {
            id: parseInt(jsonToken['userId']),
            name: jsonToken['name'],
            email: jsonToken['email'],
            admin: jsonToken['admin'] == 'true' ? true : false,
            foto: null,
          } as Usuario;
        }
        return null;
      }),
      switchMap((user) => {
        if (user) {
          return this.validateCookie().pipe(
            map((v) => (v ? user : null)),
            tap((v) => {
              if (!v) this.clearToken();
            })
          );
        }
        return of(null);
      })
    );

  }
  get expiration() {
    const decoded = jwt_decode(this.token.toString());
    if (decoded['exp'] === undefined) {
      return null;
    }
    const date = new Date(0);
    date.setUTCSeconds(decoded['exp']);
    return date;
  }

  get expirated() {
    return null /* this.expiration !== null && this.expiration.getTime() < Date.now(); */
  }

  get token() {
    if (this.loginResponse && this.loginResponse.accessToken) {
      return this.loginResponse.accessToken;
    }
    return false;
  }
  get userId(){
    return this.getUser().id
  }

  get isLoggedIn() {
    return this.token && !this.expirated;
  }

  getUser() {
    let jsonToken = jwt_decode(this.token.toString());
    let usuario: Usuario = {
      id: parseInt(jsonToken['userId']),
      name: jsonToken['name'],
      email: jsonToken['email'],
      admin: jsonToken['admin'] == "true" ? true : false,
      foto: null
    }
    return (usuario) || null;
  }
  isUserAdmin(): boolean {
    const isAdmin = this.getUser().admin

    return isAdmin;
  }
  async verificarCookie(): Promise<boolean> {
    try {

      let result = await this.http
        .get<any>(`${environment.endPointSSA}login/validar-cookie`, {withCredentials: true}).toPromise();

      if (result.accessToken != null) {
          this.saveToken(result.accessToken);
          this.atualizarLoginResponse();
          return true;
      } else {
        this.clearToken();
        this.atualizarLoginResponse();
        return false;
      }
    } catch (error) {
      this.clearToken();
      this.atualizarLoginResponse();
      return false;
    }
  }
  async limparCookie()
  {
    return await this.http.get<any>(`${environment.endPointSSA}login/logout`).toPromise();
  }
  atualizarLoginResponse() {
    const loggedUser = AuthService.getToken();

    if(loggedUser != null)
    {
      let login: LoginResponse = {
        accessToken: loggedUser,
      }
      this.loginResponse = login;
    }
  }
  async logout(redirect?: string) {
    this.clearToken();
    await this.limparCookie();

  }
  saveToken(token: string) {

    if(token != null)
    {
      this.tokenBehavior$.next(token);
      sessionStorage.setItem(STORAGE_KEY, token);
    }
  }
  clearToken() {
    sessionStorage.removeItem(STORAGE_KEY);
    this.tokenBehavior$.next(null);
  }
  validateCookie(): Observable<boolean> {
    return this.http.get(`${environment.endPointSSA}login/validar-cookie`, {withCredentials: true}).pipe(
      map(() => true),
      catchError(() => {
        this.clearToken();
        return of(false);
      })
    );
  }
}
