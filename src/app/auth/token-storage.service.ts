import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  clear(): void {
    window.sessionStorage.clear();
  }

  public getToken(): string {
    return sessionStorage.getItem('TOKEN_KEY');
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem('TOKEN_KEY');
    window.sessionStorage.setItem('TOKEN_KEY', token);
  }

  public getUser(): any {
    return JSON.parse(sessionStorage.getItem('UESR_KEY'));
  }

  public saveUser(username: string): void {
    window.sessionStorage.removeItem('USER_KEY');
    window.sessionStorage.setItem('USER_KEY', username);
  }

}
