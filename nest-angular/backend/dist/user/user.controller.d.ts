import { UserService } from './user.service';
import { User } from './models/user.interface';
import { Observable } from 'rxjs';
import { Pagination } from 'nestjs-typeorm-paginate';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    createOne(user: User): Observable<User | Object>;
    findOne(params: any): Observable<User | {}>;
    index(page: number, limit: number, username: string): Observable<Pagination<User>>;
    deleteOne(id: string): Observable<User>;
    updateOne(id: string, user: User): Observable<any>;
    login(user: User): Observable<Object>;
    updateRoleUser(id: string, user: User): Observable<User>;
    uploadFile(file: any, req: any): Observable<Object>;
    findProfileImage(imagename: any, res: any): Observable<Object>;
}
