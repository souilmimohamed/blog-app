import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../services/blog.service';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';
import { BlogDto } from '../models/blog.model';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from 'src/app/shared/components/error-modal/error-modal.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  blog$ = this.activatedRoute.paramMap.pipe(
    switchMap((params) => {
      const id = Number(params.get('id'));
      return this.blogService.getBlogById(id);
    })
  );
  blog: BlogDto;
  constructor(
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.loadBlog();
  }

  loadBlog() {
    this.blog$.subscribe((result) => {
      if (result.Success) this.blog = result.Body;
    });
  }
  likeBlog() {
    this.blogService.likeBlog(this.blog.Id).subscribe((result) => {
      if (result.Success) this.loadBlog();
    });
  }
}
