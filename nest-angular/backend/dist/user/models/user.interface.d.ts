import { BlogEntry } from 'src/blog/models/blog-entry.interface';
export interface User {
    id?: number;
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    role?: UserRole;
    profileImage?: string;
    blogEntries?: BlogEntry[];
}
export declare enum UserRole {
    ADMIN = "admin",
    EDITOR = "editor",
    CHEIFEDITOR = "cheifeditor",
    USER = "user"
}
