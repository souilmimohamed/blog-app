import { UserEntity } from './models/user.entity';
import { Repository } from 'typeorm';
import { Observable } from 'rxjs';
import { User } from './models/user.interface';
import { AuthService } from 'src/auth/auth.service';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
export declare class UserService {
    private readonly userRepository;
    private authService;
    constructor(userRepository: Repository<UserEntity>, authService: AuthService);
    create(user: User): Observable<User>;
    findAll(): Observable<User[]>;
    paginate(options: IPaginationOptions): Observable<Pagination<User>>;
    paginateFilterByUsername(options: IPaginationOptions, user: User): Observable<Pagination<User>>;
    findOne(id: number): Observable<User | {}>;
    deleteOne(id: number): Observable<any>;
    updateOne(id: number, user: User): Observable<any>;
    login(user: User): Observable<string>;
    validateUser(email: string, password: string): Observable<User>;
    findByMail(email: string): Observable<User>;
    updateRoleUser(id: number, user: User): Observable<any>;
}
