import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Subtopic } from './subtopic';
import { Observable, pipe, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubtopicService {
  private url = "http://localhost:8080/subtopics"

  constructor(private http: HttpClient) { }

  getSubtopicsForTopic(id: number): Observable<Subtopic[]> {
    return this.http.get<Subtopic[]>(`${this.url}/topic/${id}`)
      .pipe(catchError(this.handleError));
  }

  add(title: string, topicId: number): Observable<Subtopic> {
    return this.http.post<Subtopic>
      (`${this.url}/topic/${topicId}`, title, this.httpOptions);
  }

  markAsCompleted(subtopic: Subtopic): Observable<Subtopic> {
    return this.http.put<Subtopic>(this.url, subtopic , this.httpOptions);
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error.error || 'Server error');
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
}

