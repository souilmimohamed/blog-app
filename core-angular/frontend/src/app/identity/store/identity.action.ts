import { createAction, props } from '@ngrx/store';
import {
  LoginDto,
  LoginResponseDto,
  RegisterUserDto,
} from '../models/identity.model';
import { ResponseError } from 'src/app/shared/models/httpResponseModel';

export const InvokeLoginAPI = createAction(
  '[Login API] Invoke Login API',
  props<{ credentials: LoginDto }>()
);

export const LoginAPISuccess = createAction(
  '[Login API] Login API Success',
  props<{ access: LoginResponseDto }>()
);

export const LoginAPIFailure = createAction(
  '[Login API] Login API Failure',
  props<{ message: string | ResponseError }>()
);

export const InvokeRegisterAPI = createAction(
  '[Register API] Invoke Register API',
  props<{ credentials: RegisterUserDto }>()
);

export const RegisterAPISuccess = createAction(
  '[Register API] Register API Success',
  props<{ access: LoginResponseDto }>()
);

export const RegisterAPIFailure = createAction(
  '[Register API] Register API Failure',
  props<{ message: string | ResponseError }>()
);

export const Logout = createAction('[Login API] Logout');
export const LogoutSuccess = createAction('[Login API] Success');
export const LogoutFailure = createAction('[Login API] Failure');
