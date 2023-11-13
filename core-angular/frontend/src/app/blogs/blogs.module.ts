import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogsRoutingModule } from './blogs-routing.module';
import { BlogsListComponent } from './blogs-list/blogs-list.component';
import { NewBlogComponent } from './new-blog/new-blog.component';
import { BlogComponent } from './blog/blog.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { BlogReducer } from './store/blog.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BlogEffect } from './store/blog.effect';

@NgModule({
  declarations: [BlogsListComponent, NewBlogComponent, BlogComponent],
  imports: [
    CommonModule,
    BlogsRoutingModule,
    SharedModule,
    StoreModule.forFeature('blog', BlogReducer),
    EffectsModule.forFeature([BlogEffect]),
  ],
})
export class BlogsModule {}
