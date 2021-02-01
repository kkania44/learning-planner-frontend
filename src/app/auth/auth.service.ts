import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost:8080/auth/';
  httpOptions = { 
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    return this.http.post(`${this.url}/signin`, {
      username: credentials.username,
      password: credentials.password
    }, this.httpOptions);
  }

  register(credentials): Observable<any> {
    return this.http.post(`${this.url}/signup`, {
      username: credentials.username,
      password: credentials.password
    }, this.httpOptions);
  }
}
