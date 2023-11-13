import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { BlogEntry } from 'src/app/models';
import { BlogService } from 'src/app/services/blog.service';
import { WINDOW } from 'src/app/window-token';

@Component({
  selector: 'app-view-blog-entry',
  templateUrl: './view-blog-entry.component.html',
  styleUrls: ['./view-blog-entry.component.css'],
})
export class ViewBlogEntryComponent implements OnInit {
  blogEntry$: Observable<BlogEntry> = this.activatedRoute.params.pipe(
    switchMap((params: Params) => {
      const blogEntryId: number = parseInt(params['id']);
      return this.blogService
        .findOne(blogEntryId)
        .pipe(map((blogEntry: BlogEntry) => blogEntry));
    })
  );
  origin = this.window.location.origin;
  constructor(
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute,
    @Inject(WINDOW) private window: Window
  ) {}

  ngOnInit(): void {}
}
