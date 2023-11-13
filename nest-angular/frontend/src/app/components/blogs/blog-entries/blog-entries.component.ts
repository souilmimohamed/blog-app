import { Component, EventEmitter, Input, Output, Inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { BlogEntries } from 'src/app/models';
import { WINDOW } from 'src/app/window-token';

@Component({
  selector: 'app-blog-entries',
  templateUrl: './blog-entries.component.html',
  styleUrls: ['./blog-entries.component.css'],
})
export class BlogEntriesComponent {
  @Input() blogEntries: BlogEntries | null;
  @Output() paginate: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  pageEvent: PageEvent;

  origin = this.window.location.origin;
  constructor(private router: Router, @Inject(WINDOW) private window: Window) {}
  onPaginateChange(event: PageEvent) {
    event.pageIndex = event.pageIndex + 1;
    this.paginate.emit(event);
  }

  navigate(id: number) {
    this.router.navigateByUrl('blog-entries/' + id);
  }
}
