import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { LoginFrom, User } from '../models';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
export const JWT_NAME = 'token';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  login(loginFrom: LoginFrom) {
    return this.http
      .post<any>('/api/users/login', {
        email: loginFrom.email,
        password: loginFrom.password,
      })
      .pipe(
        map((token) => {
          localStorage.setItem('token', token.access_token);
          return token;
        })
      );
  }
  register(user: User) {
    return this.http.post<any>('api/users', user).pipe(map((user) => user));
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(JWT_NAME);
    return !this.jwtHelper.isTokenExpired(token);
  }

  getUserId(): Observable<number> {
    return of(localStorage.getItem(JWT_NAME)).pipe(
      switchMap((jwt: string | null) => {
        if (jwt) {
          const decodedJwt = this.jwtHelper.decodeToken(jwt);
          if (decodedJwt && decodedJwt.user && decodedJwt.user.id) {
            return of(decodedJwt.user.id);
          }
        }
        return of(-1);
      })
    );
  }

  logout() {
    localStorage.removeItem(JWT_NAME);
  }
}
