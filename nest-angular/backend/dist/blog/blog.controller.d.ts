import { BlogService } from './blog.service';
import { Observable } from 'rxjs';
import { BlogEntry } from './models/blog-entry.interface';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Image } from './models/image.interface';
export declare const BLOG_ENTRIES_URL = "http://localhost:5000/api/blogs";
export declare class BlogController {
    private blogService;
    constructor(blogService: BlogService);
    create(blogEntry: BlogEntry, req: any): Observable<BlogEntry>;
    index(page?: number, limit?: number): Observable<Pagination<BlogEntry, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    indexByUser(page: number, limit: number, userId: number): Observable<Pagination<BlogEntry>>;
    findOne(id: number): Observable<BlogEntry>;
    updateOne(id: number, blogEntry: BlogEntry): Observable<BlogEntry>;
    deleteOne(id: number): Observable<any>;
    uploadFile(file: any, req: any): Observable<Image>;
    findImage(imagename: any, res: any): Observable<Object>;
}
