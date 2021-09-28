import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { People } from './people';
import { PEOPLES } from './mock-peopple';
import { HistoryService } from './history.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  constructor(private http: HttpClient,private historyService: HistoryService) { }
  getPeoples(): Observable<People[]> {
    return this.http.get<People[]>(this.peoplesUrl)
      .pipe(
        tap(_ => this.log('fetched peoples')),
        catchError(this.handleError<People[]>('getPeoples', []))
      );
  }
  getPeople(id: number): Observable<People> {
    const url = `${this.peoplesUrl}/${id}`;
    return this.http.get<People>(url).pipe(
      tap(_ => this.log(`fetched people id=${id}`)),
      catchError(this.handleError<People>(`getPeople id=${id}`))
    );
  }
  addPeople(people: People): Observable<People> {
    return this.http.post<People>(this.peoplesUrl, people, this.httpOptions).pipe(
      tap((newPeople: People) => this.log(`added people w/ id=${newPeople.id}`)),
      catchError(this.handleError<People>('addPeople'))
    );
  }
  
  deletePeople(id: number): Observable<People> {
  const url = `${this.peoplesUrl}/${id}`;

  return this.http.delete<People>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted people id=${id}`)),
    catchError(this.handleError<People>('deletePeople'))
  );
}
  updatePeople(people: People): Observable<any> {
    return this.http.put(this.peoplesUrl, people, this.httpOptions).pipe(tap(_ => this.log(`updated people id=${people.id}`)),
    catchError(this.handleError<any>('updatePeople'))
  );
}
  httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
  private log(history: string) {
    this.historyService.add(`PeopleService: ${history}`);
  }
  private peoplesUrl = 'api/peoples';  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}