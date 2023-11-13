import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CustomValidators } from '../../../admin/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerFrom: FormGroup;
  constructor(
    private authService: AuthenticationService,
    private fromBuilder: FormBuilder,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.registerFrom = this.fromBuilder.group(
      {
        name: [null, [Validators.required]],
        username: [null, [Validators.required]],
        email: [
          null,
          [Validators.required, Validators.email, Validators.minLength(6)],
        ],
        password: [
          null,
          [
            Validators.required,
            Validators.minLength(3),
            CustomValidators.passwordContainsNumber,
          ],
        ],
        passwordConfirm: [null, [Validators.required]],
      },
      {
        validator: CustomValidators.passwordsMatch,
      }
    );
  }
  onSubmit() {
    if (this.registerFrom.invalid) {
      return;
    }
    this.authService
      .register(this.registerFrom.value)
      .pipe(map((user) => this.route.navigate(['login'])))
      .subscribe();
  }
}
