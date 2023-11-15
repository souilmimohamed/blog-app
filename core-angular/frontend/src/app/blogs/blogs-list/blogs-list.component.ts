import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectBlogs } from '../store/blog.selector';
import { filter } from '../models/blog.model';
import { InvokeBlogAPI } from '../store/blog.action';
import { PageEvent } from '@angular/material/paginator';
import { IdentityService } from 'src/app/identity/services/identity.service';
import { take } from 'rxjs/operators';
import { KeyValuePair } from 'src/app/shared/models/commom.model';
import { MatSelectChange } from '@angular/material/select';

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
  publishers: KeyValuePair<string, string>[] = [];
  searchText: string = '';
  selectPublisher: string = '';
  constructor(private store: Store, private identityService: IdentityService) {}

  ngOnInit(): void {
    this.store.dispatch(InvokeBlogAPI({ filter: this.filter }));
    this.loadPublishers();
  }
  getPage(event: PageEvent) {
    console.log(event);
    this.filter = {
      ...this.filter,
      PageNumber: event.pageIndex === 0 ? 1 : event.pageIndex + 1,
    };
    this.store.dispatch(InvokeBlogAPI({ filter: this.filter }));
  }
  loadPublishers() {
    this.identityService
      .getAllUsers()
      .pipe(take(1))
      .subscribe((result) => {
        if (result.Success) {
          this.publishers = result.Body.map((user) => {
            return {
              Key: user.Username,
              Value: user.Name,
            };
          });
        }
      });
  }

  search() {
    this.filter = {
      ...this.filter,
      SearchText: this.searchText,
      Publisher: this.selectPublisher,
      PageNumber: 1,
    };
    this.store.dispatch(InvokeBlogAPI({ filter: this.filter }));
  }
}
