import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './auth/token-storage.service';
import { Topic } from './topic';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  private url = 'http://localhost:8080/topics';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  getAllTopics(userId: number): Observable<Topic[]> {
    let httpOptions = this.setAuthHeader();
    console.log(httpOptions);
    return this.http.get<Topic[]>(`${this.url}/user/${userId}`, httpOptions);
  }

  private setAuthHeader() {
    let token = this.tokenStorage.getToken();
    let httpOptions = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` }) };
    return httpOptions;
  }

  getOneById(topicId: number): Observable<Topic> {
    return this.http.get<Topic>(`${this.url}/${topicId}`)
  }

  add(newTopic: Topic, userId: number): Observable<Topic> {
    return this.http.post<Topic>(`${this.url}/user/${userId}`, newTopic, this.httpOptions);
  }

  start(topicId: number): Observable<Topic> {
    return this.http.put<Topic>(`${this.url}/${topicId}`, topicId, this.httpOptions);
  }

  update(topic: Topic): Observable<Topic> {
    return this.http.put<Topic>(this.url, topic, this.httpOptions);
  }

  delete(topicId: number): Observable<any> {
    return this.http.delete<Topic>(`${this.url}/${topicId}`);
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

}
