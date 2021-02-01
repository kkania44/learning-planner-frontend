import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public getToken(): string {
    return sessionStorage.getItem('TOKEN_KEY');
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem('TOKEN_KEY');
    window.sessionStorage.getItem('TOKEN_KEY');
  }

  public getUser(): any {
    return JSON.parse(sessionStorage.getItem('UESR_KEY'));
  }

  public saveUser(user): void {
    window.sessionStorage.removeItem('USER_KEY');
    window.sessionStorage.setItem('USER_KEY', JSON.stringify(user));
  }

}
