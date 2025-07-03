import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CreateHeroPayload, Hero, Pagination } from '../models';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Messages } from './messages';

@Injectable({ providedIn: 'root' })
export class Heros {
  private readonly _baseUrl = environment.apiUrl + '/heros';
  constructor(private http: HttpClient, private messages: Messages) {}

  getHeros(
    page: number,
    perPage: number,
    searchTerm?: string
  ): Observable<Pagination<Hero>> {
    return this.http
      .get<Hero[]>(this._baseUrl, {
        observe: 'response',
        responseType: 'json',
        params: {
          _start: (page - 1) * perPage,
          _limit: perPage,
          ...(searchTerm && { name_like: searchTerm }),
        },
      })
      .pipe(
        map((res) => {
          const data = res.body!;
          const totalItems = Number(res.headers.get('X-Total-Count')) || 0;
          return {
            data,
            perPage,
            page,
            items: totalItems,
            last: Math.ceil(totalItems / perPage),
            pages: Math.ceil(totalItems / perPage),
            prev: page > 1 ? page - 1 : null,
            next: page < Math.ceil(totalItems / perPage) ? page + 1 : null,
          };
        }),
        catchError((error) =>
          throwError(() => new Error(error.message || 'Failed to fetch heroes'))
        )
      );
  }

  createHero(hero: CreateHeroPayload): Observable<Hero> {
    return this.http.post<Hero>(this._baseUrl, hero).pipe(
      tap(() => {
        this.messages.showMessage('Hero created successfully');
      }),
      catchError((error) => {
        this.messages.showMessage('Failed to create hero');
        return throwError(() => error);
      })
    );
  }

  deleteHero(id: string): Observable<Hero> {
    return this.http.delete<Hero>(`${this._baseUrl}/${id}`).pipe(
      tap(() => {
        this.messages.showMessage('Hero deleted successfully');
      }),
      catchError((error) => {
        this.messages.showMessage('Failed to delete hero');
        return throwError(() => error);
      })
    );
  }

  getHeroById(id: string): Observable<Hero> {
    return this.http.get<Hero>(`${this._baseUrl}/${id}`).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 404) {
          this.messages.showMessage('Hero not found');
        }
        return throwError(() => error);
      })
    );
  }

  patchHero(id: string, changes: Partial<CreateHeroPayload>): Observable<Hero> {
    return this.http.patch<Hero>(`${this._baseUrl}/${id}`, changes).pipe(
      tap(() => {
        this.messages.showMessage('Hero updated successfully');
      }),
      catchError((error) => {
        this.messages.showMessage('Failed to update hero');
        return throwError(() => error);
      })
    );
  }
}
