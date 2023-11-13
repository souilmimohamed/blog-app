import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlogEntries, BlogEntry } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient) {}

  indexAll(page: number, limit: number): Observable<BlogEntries> {
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('limit', limit);
    return this.http.get<BlogEntries>('/api/blogs', { params });
  }

  indexByUser(
    page: number,
    limit: number,
    userId: number
  ): Observable<BlogEntries> {
    let params = new HttpParams();
    params = params.append('page', page);
    params = params.append('limit', limit);
    return this.http.get<BlogEntries>('/api/blogs/user/' + userId, { params });
  }

  post(blogEntry: BlogEntry): Observable<BlogEntry> {
    return this.http.post<BlogEntry>('/api/blogs', blogEntry);
  }

  uploadHeaderImage(formData: FormData): Observable<any> {
    return this.http.post<FormData>('api/blogs/image/upload', formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  findOne(id: number): Observable<BlogEntry> {
    return this.http.get<BlogEntry>('/api/blogs/' + id);
  }
}
