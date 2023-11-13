import { createFeatureSelector } from '@ngrx/store';
import { BlogState } from './blog.reducer';

export const selectBlogs = createFeatureSelector<BlogState>('blog');
