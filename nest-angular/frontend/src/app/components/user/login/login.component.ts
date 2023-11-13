import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginFrom: FormGroup;
  constructor(
    private authService: AuthenticationService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.loginFrom = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.minLength(6),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }
  onSubmit() {
    if (this.loginFrom.invalid) {
      return;
    }
    this.authService
      .login(this.loginFrom.value)
      .pipe(map((token) => this.route.navigate(['admin'])))
      .subscribe();
  }
}
