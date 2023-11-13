import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { InvokeLoginAPI } from '../store/identity.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  fieldRequired: string = 'This field is required';
  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      Email: [null, [Validators.required, Validators.email]],
      Password: [null, [Validators.required]],
    });
  }
  checkValidation(input: string) {
    const validation =
      this.loginForm.get(input)?.invalid &&
      (this.loginForm.get(input)?.dirty || this.loginForm.get(input)?.touched);
    return validation;
  }
  emailErrors() {
    return this.loginForm.get('Email')?.hasError('required')
      ? 'This field is required'
      : this.loginForm.get('Email')?.hasError('email')
      ? 'Not a valid emailaddress'
      : '';
  }
  login() {
    if (this.loginForm.invalid) return;
    this.store.dispatch(InvokeLoginAPI({ credentials: this.loginForm.value }));
  }
}
