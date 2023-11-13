"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./models/user.entity");
const typeorm_2 = require("typeorm");
const rxjs_1 = require("rxjs");
const user_interface_1 = require("./models/user.interface");
const auth_service_1 = require("../auth/auth.service");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
let UserService = class UserService {
    constructor(userRepository, authService) {
        this.userRepository = userRepository;
        this.authService = authService;
    }
    create(user) {
        return this.authService.hashPassword(user.password).pipe((0, rxjs_1.switchMap)((passwordHash) => {
            const newUser = new user_entity_1.UserEntity();
            newUser.name = user.name;
            newUser.username = user.username;
            newUser.email = user.email;
            newUser.password = passwordHash;
            newUser.role = user_interface_1.UserRole.USER;
            return (0, rxjs_1.from)(this.userRepository.save(newUser)).pipe((0, rxjs_1.map)((user) => {
                delete user.password;
                return user;
            }), (0, rxjs_1.catchError)((err) => (0, rxjs_1.throwError)(err)));
        }));
    }
    findAll() {
        return (0, rxjs_1.from)(this.userRepository.find()).pipe((0, rxjs_1.map)((users) => {
            users.forEach(function (v) {
                delete v.password;
            });
            return users;
        }));
    }
    paginate(options) {
        return (0, rxjs_1.from)((0, nestjs_typeorm_paginate_1.paginate)(this.userRepository, options)).pipe((0, rxjs_1.map)((usersPageble) => {
            usersPageble.items.forEach(function (v) {
                delete v.password;
            });
            return usersPageble;
        }));
    }
    paginateFilterByUsername(options, user) {
        return (0, rxjs_1.from)(this.userRepository.findAndCount({
            skip: Number(options.page) * Number(options.limit) || 0,
            take: Number(options.limit) || 10,
            order: { id: 'ASC' },
            select: ['id', 'name', 'username', 'email', 'role'],
            relations: ['blogEntries'],
            where: [{ username: (0, typeorm_2.Like)(`%${user.username}%`) }],
        })).pipe((0, rxjs_1.map)(([users, totalUsers]) => {
            const usersPageable = {
                items: users,
                links: {
                    first: options.route + `?limit=${options.limit}`,
                    previous: options.route + ``,
                    next: options.route +
                        `?limit=${options.limit}&page=${Number(options.page) + 1}`,
                    last: options.route +
                        `?limit=${options.limit}&page=${Math.ceil(totalUsers / Number(options.limit))}`,
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
        }));
    }
    findOne(id) {
        return (0, rxjs_1.from)(this.userRepository.findOne({
            where: { id },
            relations: ['blogEntries'],
        })).pipe((0, rxjs_1.map)((user) => {
            if (user) {
                delete user.password;
                return user;
            }
            else
                return {};
        }));
    }
    deleteOne(id) {
        return (0, rxjs_1.from)(this.userRepository.delete(id));
    }
    updateOne(id, user) {
        delete user.email;
        delete user.password;
        delete user.role;
        return (0, rxjs_1.from)(this.userRepository.update(id, user)).pipe((0, rxjs_1.switchMap)(() => this.findOne(id)));
    }
    login(user) {
        console.log(user);
        return this.validateUser(user.email, user.password).pipe((0, rxjs_1.switchMap)((user) => {
            if (user) {
                return this.authService
                    .generateJWT(user)
                    .pipe((0, rxjs_1.map)((jwt) => jwt));
            }
            else
                return '-';
        }));
    }
    validateUser(email, password) {
        return (0, rxjs_1.from)(this.userRepository.findOne({
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
        })).pipe((0, rxjs_1.switchMap)((user) => this.authService.comparePasswords(password, user.password).pipe((0, rxjs_1.map)((match) => {
            if (match) {
                delete user.password;
                return user;
            }
            else {
                throw Error;
            }
        }))));
    }
    findByMail(email) {
        return (0, rxjs_1.from)(this.userRepository.findOne({ where: { email: email } }));
    }
    updateRoleUser(id, user) {
        return (0, rxjs_1.from)(this.userRepository.update(id, user));
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        auth_service_1.AuthService])
], UserService);
//# sourceMappingURL=user.service.js.map