import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private route: Router
  ) {}
  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.route.navigate(['login']);
      return false;
    }
    return true;
  }
}
