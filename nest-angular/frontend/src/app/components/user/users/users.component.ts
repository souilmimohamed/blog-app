import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserData } from '../../../models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  dataSource: UserData;
  dislayedColumns: string[] = ['id', 'name', 'username', 'email', 'role'];
  pageEvent: PageEvent;
  filterValue: string = '';
  constructor(
    private userService: UserService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initDataSource();
  }

  initDataSource() {
    this.userService
      .findAll(1, 10)
      .pipe(map((userData: UserData) => (this.dataSource = userData)))
      .subscribe();
  }
  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;
    if (this.filterValue === null || this.filterValue === undefined) {
      page = page + 1;

      this.userService
        .findAll(page, size)
        .pipe(map((userData: UserData) => (this.dataSource = userData)))
        .subscribe();
    } else {
      this.userService
        .paginateByName(page, size, this.filterValue)
        .pipe(map((userData: UserData) => (this.dataSource = userData)))
        .subscribe();
    }
  }
  findByName(username: string) {
    this.userService
      .paginateByName(0, 10, username)
      .pipe(map((userData: UserData) => (this.dataSource = userData)))
      .subscribe();
  }
  navigateToProfile(id: number) {
    this.route.navigate(['./' + id], { relativeTo: this.activatedRoute });
  }
}
