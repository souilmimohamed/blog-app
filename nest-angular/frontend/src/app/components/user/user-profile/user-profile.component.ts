import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { BlogEntries, User } from '../../../models';
import { UserService } from 'src/app/services/user.service';
import { ObserversModule } from '@angular/cdk/observers';
import { BlogService } from 'src/app/services/blog.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  private userId$: Observable<number> = this.activatedRoute.params.pipe(
    map((param: Params) => parseInt(param['id']))
  );
  user$: Observable<User> = this.userId$.pipe(
    switchMap((userId: number) => this.userService.findOneUser(userId))
  );
  blogEntries$: Observable<BlogEntries> = this.userId$.pipe(
    switchMap((userId: number) => this.blogService.indexByUser(1, 10, userId))
  );
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService
  ) {}

  onPaginateChange(event: PageEvent) {
    return this.userId$
      .pipe(
        tap(
          (userId: number) =>
            (this.blogEntries$ = this.blogService.indexByUser(
              userId,
              event.pageIndex,
              event.pageSize
            ))
        )
      )
      .subscribe();
  }
}
