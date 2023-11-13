import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlogDto, blogsResponseModel, filter } from '../models/blog.model';
import { HttpResponseModel } from 'src/app/shared/models/httpResponseModel';
import { environment } from 'src/environments/environment';
import { ImageDto } from 'src/app/shared/models/imageModel';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  MODULE = 'UserBlogs/Blogs/';
  constructor(private http: HttpClient) {}

  getBlogs(filter: filter) {
    return this.http.post<HttpResponseModel<blogsResponseModel>>(
      `${environment.ApiUrl}${this.MODULE}GetBlogs`,
      filter
    );
  }

  getBlogById(id: number) {
    return this.http.get<HttpResponseModel<BlogDto>>(
      `${environment.ApiUrl}${this.MODULE}GetBlogById?id=${id}`
    );
  }

  likeBlog(id: number) {
    return this.http.get<HttpResponseModel<number>>(
      `${environment.ApiUrl}${this.MODULE}LikeBlog?id=${id}`
    );
  }

  updateBlogHeaderImage(data: FormData) {
    return this.http.post<HttpResponseModel<string>>(
      `${environment.ApiUrl}${this.MODULE}UpdateBlogHeaderImage`,
      data
    );
  }

  addBlog(data: BlogDto) {
    return this.http.post<HttpResponseModel<BlogDto>>(
      `${environment.ApiUrl}${this.MODULE}AddBlog`,
      data
    );
  }
}
