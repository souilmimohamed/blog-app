import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectBlogs } from '../store/blog.selector';
import { filter } from '../models/blog.model';
import { InvokeBlogAPI } from '../store/blog.action';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-blogs-list',
  templateUrl: './blogs-list.component.html',
  styleUrls: ['./blogs-list.component.scss'],
})
export class BlogsListComponent implements OnInit {
  blogs$ = this.store.pipe(select(selectBlogs));
  filter: filter = {
    PageNumber: 1,
    PageSize: 10,
    Publisher: '',
    SearchText: '',
    SortDate: 'ASC',
  };
  columns = [
    'Title',
    'Description',
    'Slug',
    'Date Creation',
    'Publisher',
    'Likes',
    'Actions',
  ];
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(InvokeBlogAPI({ filter: this.filter }));
  }
  getPage(event: PageEvent) {
    console.log(event);
    this.filter = {
      ...this.filter,
      PageNumber: event.pageIndex === 0 ? 1 : event.pageIndex + 1,
    };
    this.store.dispatch(InvokeBlogAPI({ filter: this.filter }));
  }
}
