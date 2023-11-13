import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { IdentityService } from '../services/identity.service';
import { Router } from '@angular/router';
import {
  InvokeLoginAPI,
  InvokeRegisterAPI,
  LoginAPIFailure,
  LoginAPISuccess,
  Logout,
  LogoutFailure,
  LogoutSuccess,
  RegisterAPIFailure,
  RegisterAPISuccess,
} from './identity.action';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class IdentityEffect {
  constructor(
    private store: Store,
    private actions$: Actions,
    private identityService: IdentityService,
    private router: Router
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InvokeLoginAPI),
      switchMap((action) => {
        return this.identityService.login(action.credentials).pipe(
          map((data) => {
            if (data.Success) {
              this.router.navigate(['/']);
              return LoginAPISuccess({ access: data.Body });
            } else return LoginAPIFailure({ message: data.Errors[0] });
          })
        );
      })
    );
  });

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InvokeRegisterAPI),
      switchMap((action) => {
        return this.identityService.register(action.credentials).pipe(
          map((data) => {
            if (data.Success) {
              this.router.navigate(['/']);
              return RegisterAPISuccess({ access: data.Body });
            } else return RegisterAPIFailure({ message: data.Errors[0] });
          })
        );
      })
    );
  });

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(Logout),
      switchMap((action) => {
        return this.identityService.logout().pipe(
          map((data) => {
            if (data) {
              this.router.navigate(['/users/login']);
              return LogoutSuccess();
            } else return LogoutFailure();
          })
        );
      })
    );
  });
}
