import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { BlogEntries } from 'src/app/models';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  blogEntries$: Observable<BlogEntries> = this.blogService.indexAll(1, 10);
  constructor(private blogService: BlogService) {}

  onPaginateChange(event: PageEvent) {
    this.blogEntries$ = this.blogService.indexAll(
      event.pageIndex,
      event.pageSize
    );
  }
}
