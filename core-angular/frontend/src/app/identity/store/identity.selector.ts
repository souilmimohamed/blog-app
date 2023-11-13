import { createFeatureSelector } from '@ngrx/store';
import { IdentityState } from './identity.reducer';

export const selectIdentity = createFeatureSelector<IdentityState>('identity');
