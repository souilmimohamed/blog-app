import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  LoginDto,
  LoginResponseDto,
  RegisterUserDto,
  UserDto,
} from '../models/identity.model';
import { environment } from 'src/environments/environment';
import { HttpResponseModel } from 'src/app/shared/models/httpResponseModel';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  MODULE = 'Identity/Users/';
  constructor(private http: HttpClient) {}

  register(data: RegisterUserDto) {
    return this.http.post<HttpResponseModel<LoginResponseDto>>(
      `${environment.ApiUrl}${this.MODULE}RegisterUser`,
      data
    );
  }

  login(data: LoginDto) {
    return this.http.post<HttpResponseModel<LoginResponseDto>>(
      `${environment.ApiUrl}${this.MODULE}Login`,
      data
    );
  }
  logout(): Observable<boolean> {
    return of(true);
  }

  getAllUsers() {
    return this.http.get<HttpResponseModel<UserDto[]>>(
      `${environment.ApiUrl}${this.MODULE}GetAllUsers`
    );
  }
}
