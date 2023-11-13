import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BlogService } from '../services/blog.service';
import { FetchBlogsAPISuccess, InvokeBlogAPI } from './blog.action';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class BlogEffect {
  constructor(private actions$: Actions, private blogService: BlogService) {}

  blogs$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InvokeBlogAPI),
      switchMap((action) => {
        return this.blogService.getBlogs(action.filter).pipe(
          map((data) => {
            return FetchBlogsAPISuccess({ blogs: data.Body });
          })
        );
      })
    );
  });
}
