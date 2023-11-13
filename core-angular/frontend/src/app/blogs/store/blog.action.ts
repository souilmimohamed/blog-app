import { createAction, props } from '@ngrx/store';
import { blogsResponseModel, filter } from '../models/blog.model';

export const InvokeBlogAPI = createAction(
  '[Blog API] invoke Blogs Fetch API',
  props<{ filter: filter }>()
);

export const FetchBlogsAPISuccess = createAction(
  '[Blog API] fetch Blogs API Success',
  props<{ blogs: blogsResponseModel }>()
);
