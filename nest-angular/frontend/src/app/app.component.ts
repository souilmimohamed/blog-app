import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private route: Router,
    private authService: AuthenticationService
  ) {}
  title = 'frontend';
  navigateTo(value: string) {
    this.route.navigate(['../', value]);
  }
  logout() {
    this.authService.logout();
  }
}
