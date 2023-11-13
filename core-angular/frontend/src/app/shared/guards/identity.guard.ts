import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IdentityState } from 'src/app/identity/store/identity.reducer';

@Injectable({
  providedIn: 'root',
})
export class IdentityGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<{ identity: IdentityState }>
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store
      .select((state) => state.identity.IsLoggedIn)
      .pipe(
        map((isLoggedIn) => {
          if (!isLoggedIn) {
            this.router.navigate(['/users/login']);
          }
          return true;
        })
      );
  }
}
