import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { InvokeRegisterAPI } from '../store/identity.action';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  fieldRequired: string = 'This field is required';
  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      Email: [null, [Validators.required, Validators.email]],
      Name: [null, [Validators.required]],
      Username: [null, [Validators.required, Validators.minLength(6)]],
      Password: [
        null,
        [
          Validators.required,
          Validators.pattern('^(?=.*[A-Z])(?=.*\\d)(?=.*\\W).{6,}$'),
        ],
      ],
    });
  }
  register() {
    if (this.registerForm.invalid) return;
    this.store.dispatch(
      InvokeRegisterAPI({ credentials: this.registerForm.value })
    );
  }
  checkValidation(input: string) {
    const validation =
      this.registerForm.get(input)?.invalid &&
      (this.registerForm.get(input)?.dirty ||
        this.registerForm.get(input)?.touched);
    return validation;
  }
  emailErrors() {
    return this.registerForm.get('Email')?.hasError('required')
      ? 'This field is required'
      : this.registerForm.get('Email')?.hasError('email')
      ? 'Not a valid emailaddress'
      : '';
  }
  usernameError() {
    return this.registerForm.get('Username')?.hasError('required')
      ? 'This field is required'
      : this.registerForm.get('Username')?.hasError('minlength')
      ? 'username must be at least 6 caracters long'
      : '';
  }
  getErrorPassword() {
    return this.registerForm.get('Password')?.hasError('required')
      ? 'This field is required (Password should be at least 6 caraters long, contains at least one Uppercase, one digit and one symbol)'
      : this.registerForm.get('Password')?.hasError('pattern')
      ? 'Password should be at least 6 caraters long, contains at least one Uppercase, one digit and one symbol'
      : '';
  }
}
