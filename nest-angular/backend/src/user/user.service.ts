import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { Like, Repository } from 'typeorm';
import { Observable, from, map, switchMap, catchError, throwError } from 'rxjs';
import { User, UserRole } from './models/user.interface';
import { AuthService } from 'src/auth/auth.service';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private authService: AuthService,
  ) {}

  create(user: User): Observable<User> {
    return this.authService.hashPassword(user.password).pipe(
      switchMap((passwordHash: string) => {
        const newUser = new UserEntity();
        newUser.name = user.name;
        newUser.username = user.username;
        newUser.email = user.email;
        newUser.password = passwordHash;
        newUser.role = UserRole.USER;
        return from(this.userRepository.save(newUser)).pipe(
          map((user: User) => {
            delete user.password;
            return user;
          }),
          catchError((err) => throwError(err)),
        );
      }),
    );
  }
  findAll(): Observable<User[]> {
    return from(this.userRepository.find()).pipe(
      map((users) => {
        users.forEach(function (v) {
          delete v.password;
        });
        return users;
      }),
    );
  }
  paginate(options: IPaginationOptions): Observable<Pagination<User>> {
    return from(paginate<User>(this.userRepository, options)).pipe(
      map((usersPageble: Pagination<User>) => {
        usersPageble.items.forEach(function (v) {
          delete v.password;
        });
        return usersPageble;
      }),
    );
  }

  paginateFilterByUsername(
    options: IPaginationOptions,
    user: User,
  ): Observable<Pagination<User>> {
    return from(
      this.userRepository.findAndCount({
        skip: Number(options.page) * Number(options.limit) || 0,
        take: Number(options.limit) || 10,
        order: { id: 'ASC' },
        select: ['id', 'name', 'username', 'email', 'role'],
        relations: ['blogEntries'],
        where: [{ username: Like(`%${user.username}%`) }],
      }),
    ).pipe(
      map(([users, totalUsers]) => {
        const usersPageable: Pagination<User> = {
          items: users,
          links: {
            first: options.route + `?limit=${options.limit}`,
            previous: options.route + ``,
            next:
              options.route +
              `?limit=${options.limit}&page=${Number(options.page) + 1}`,
            last:
              options.route +
              `?limit=${options.limit}&page=${Math.ceil(
                totalUsers / Number(options.limit),
              )}`,
          },
          meta: {
            currentPage: Number(options.page),
            itemCount: users.length,
            itemsPerPage: Number(options.limit),
            totalItems: totalUsers,
            totalPages: Math.ceil(totalUsers / Number(options.limit)),
          },
        };
        return usersPageable;
      }),
    );
  }
  findOne(id: number): Observable<User | {}> {
    return from(
      this.userRepository.findOne({
        where: { id },
        relations: ['blogEntries'],
      }),
    ).pipe(
      map((user: User) => {
        if (user) {
          delete user.password;
          return user;
        } else return {};
      }),
    );
  }
  deleteOne(id: number): Observable<any> {
    return from(this.userRepository.delete(id));
  }
  updateOne(id: number, user: User): Observable<any> {
    delete user.email;
    delete user.password;
    delete user.role;
    return from(this.userRepository.update(id, user)).pipe(
      switchMap(() => this.findOne(id)),
    );
  }

  login(user: User): Observable<string> {
    console.log(user);
    return this.validateUser(user.email, user.password).pipe(
      switchMap((user: User) => {
        if (user) {
          return this.authService
            .generateJWT(user)
            .pipe(map((jwt: string) => jwt));
        } else return '-';
      }),
    );
  }

  validateUser(email: string, password: string): Observable<User> {
    return from(
      this.userRepository.findOne({
        where: {
          email: email,
        },
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          password: true,
          role: true,
          profileImage: true,
        },
      }),
    ).pipe(
      switchMap((user: User) =>
        this.authService.comparePasswords(password, user.password).pipe(
          map((match: boolean) => {
            if (match) {
              delete user.password;
              return user;
            } else {
              throw Error;
            }
          }),
        ),
      ),
    );
  }

  findByMail(email: string): Observable<User> {
    return from(this.userRepository.findOne({ where: { email: email } }));
  }

  updateRoleUser(id: number, user: User): Observable<any> {
    return from(this.userRepository.update(id, user));
  }
}
