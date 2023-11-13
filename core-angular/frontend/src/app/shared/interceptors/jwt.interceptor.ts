import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IdentityState } from 'src/app/identity/store/identity.reducer';
import { first, mergeMap } from 'rxjs/operators';
import { verfifyUrl } from './requestUrlVerifier';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private identityStore: Store<{ identity: IdentityState }>) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.identityStore
      .select((state) => state.identity.token)
      .pipe(
        first(),
        mergeMap((token) => {
          const _request =
            !!token && verfifyUrl(request.url)
              ? request.clone({
                  setHeaders: {
                    Authorization: `Bearer ${token}`,
                  },
                })
              : request;
          const __request = !request.url
            .toLocaleLowerCase()
            .endsWith('updateblogheaderimage')
            ? _request.clone({
                setHeaders: { 'Content-Type': 'application/json' },
              })
            : _request;
          return next.handle(_request);
        })
      );
  }
}
