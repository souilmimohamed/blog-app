import { createReducer, on } from '@ngrx/store';
import { BlogDto } from '../models/blog.model';
import { FetchBlogsAPISuccess } from './blog.action';

export interface BlogState {
  blogs: BlogDto[];
  totalCount: number;
  totalPages: number;
}

export const initialState: BlogState = {
  blogs: [],
  totalCount: 0,
  totalPages: 0,
};

export const BlogReducer = createReducer(
  initialState,
  on(FetchBlogsAPISuccess, (state, { blogs }) => {
    return {
      ...state,
      blogs: blogs.Items,
      totalCount: blogs.TotalCount,
      totalPages: blogs.TotalPages,
    };
  })
);
