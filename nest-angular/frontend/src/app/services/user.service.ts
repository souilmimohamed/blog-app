import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User, UserData } from '../models';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  findOneUser(id: number): Observable<User> {
    return this.http
      .get<User>('/api/users/' + id)
      .pipe(map((user: User) => user));
  }

  findAll(page: number, size: number): Observable<UserData> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(size));

    return this.http.get<UserData>('/api/users', { params }).pipe(
      map((userData: UserData) => userData),
      catchError((err) => throwError(err))
    );
  }

  paginateByName(
    page: number,
    size: number,
    username: string
  ): Observable<UserData> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(size));
    params = params.append('username', username);

    return this.http.get<UserData>('/api/users', { params }).pipe(
      map((userData: UserData) => userData),
      catchError((err) => throwError(err))
    );
  }

  updateOne(user: User): Observable<User> {
    return this.http.put<User>('/api/users/' + user.id, user);
  }

  upaloadProfileImage(formData: FormData): Observable<any> {
    return this.http.post<FormData>('/api/users/upload', formData, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
