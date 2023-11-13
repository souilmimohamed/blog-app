import { Observable } from 'rxjs';
import { BlogEntry } from './models/blog-entry.interface';
import { User } from 'src/user/models/user.interface';
import { BlogEntryEntity } from './models/blog-entry.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
export declare class BlogService {
    private readonly blogRepository;
    private userService;
    constructor(blogRepository: Repository<BlogEntryEntity>, userService: UserService);
    create(user: User, blogEntry: BlogEntry): Observable<BlogEntry>;
    findAll(): Observable<BlogEntry[]>;
    paginateAll(options: IPaginationOptions): Observable<Pagination<BlogEntry>>;
    paginateByUser(options: IPaginationOptions, userId: number): Observable<Pagination<BlogEntry>>;
    findByUser(userId: number): Observable<BlogEntry[]>;
    findOne(id: number): Observable<BlogEntry>;
    updateOne(id: number, blogEntry: BlogEntry): Observable<BlogEntry>;
    deleteOne(id: number): Observable<any>;
    generateSlug(title: string): Observable<string>;
}
