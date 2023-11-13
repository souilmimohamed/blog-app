import { CanActivate, ExecutionContext } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { BlogService } from '../blog.service';
import { Observable } from 'rxjs';
export declare class UserIsAuthorGuard implements CanActivate {
    private userService;
    private blogService;
    constructor(userService: UserService, blogService: BlogService);
    canActivate(context: ExecutionContext): Observable<boolean>;
}
