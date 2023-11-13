import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IdentityState } from './identity/store/identity.reducer';
import { Logout } from './identity/store/identity.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loggedIn$ = this.identityStore.select((state) => state.identity.IsLoggedIn);
  username$ = this.identityStore.select((state) => state.identity.username);
  constructor(
    private identityStore: Store<{ identity: IdentityState }>,
    private store: Store
  ) {}
  logout() {
    this.store.dispatch(Logout());
  }
}
