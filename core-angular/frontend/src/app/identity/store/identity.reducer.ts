import { createReducer, on } from '@ngrx/store';
import {
  LoginAPIFailure,
  LoginAPISuccess,
  Logout,
  RegisterAPIFailure,
  RegisterAPISuccess,
} from './identity.action';

export interface IdentityState {
  token: string;
  IsLoggedIn: boolean;
  name: string;
  username: string;
  email: string;
}

export const initialState: IdentityState = {
  IsLoggedIn: false,
  email: '',
  name: '',
  username: '',
  token: '',
};

export const IdentityReducer = createReducer(
  initialState,
  on(LoginAPISuccess, (state, { access }) => {
    return {
      ...state,
      email: access.Email,
      IsLoggedIn: true,
      name: access.Name,
      username: access.Username,
      token: access.Token,
    };
  }),
  on(LoginAPIFailure, (state, { message }) => {
    return {
      ...state,
      IsLoggedIn: false,
      email: '',
      name: '',
      username: '',
      token: '',
    };
  }),
  on(RegisterAPISuccess, (state, { access }) => {
    return {
      ...state,
      IsLoggedIn: true,
      email: access.Email,
      name: access.Name,
      username: access.Username,
      token: access.Token,
    };
  }),
  on(RegisterAPIFailure, (state, { message }) => {
    return {
      ...state,
      IsLoggedIn: false,
      email: '',
      name: '',
      username: '',
      token: '',
    };
  }),
  on(Logout, (state) => {
    return {
      ...state,
      IsLoggedIn: false,
      email: '',
      name: '',
      username: '',
      token: '',
    };
  })
);
