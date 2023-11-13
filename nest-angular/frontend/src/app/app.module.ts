import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { UsersComponent } from './components/user/users/users.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { MatCardModule } from '@angular/material/card';
import { UpdateUserProfileComponent } from './components/user/update-user-profile/update-user-profile.component';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { WINDOW_PROVIDERS } from './window-token';
import { HomeComponent } from './components/home/home.component';
import { BlogEntriesComponent } from './components/blogs/blog-entries/blog-entries.component';
import { CreateBlogEntryComponent } from './components/blogs/create-blog-entry/create-blog-entry.component';
import { MarkdownModule } from 'ngx-markdown';
import { ViewBlogEntryComponent } from './components/blogs/view-blog-entry/view-blog-entry.component';
const MAT_MODULES = [
  MatToolbarModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatSelectModule,
  MatTableModule,
  MatPaginatorModule,
  MatCardModule,
  MatProgressBarModule,
  MatIconModule,
];
const COMPONENTS = [
  AppComponent,
  LoginComponent,
  RegisterComponent,
  UsersComponent,
  UserProfileComponent,
  UpdateUserProfileComponent,
  HomeComponent,
  BlogEntriesComponent,
  CreateBlogEntryComponent,
  ViewBlogEntryComponent,
];
@NgModule({
  declarations: [
    ...COMPONENTS,
    UpdateUserProfileComponent,
    HomeComponent,
    BlogEntriesComponent,
    CreateBlogEntryComponent,
    ViewBlogEntryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MarkdownModule.forRoot(),
    ...MAT_MODULES,
  ],
  providers: [
    WINDOW_PROVIDERS,
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
