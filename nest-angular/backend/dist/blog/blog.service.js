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
exports.BlogService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const blog_entry_entity_1 = require("./models/blog-entry.entity");
const typeorm_1 = require("typeorm");
const user_service_1 = require("../user/user.service");
const typeorm_2 = require("@nestjs/typeorm");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const slugify = require('slugify');
let BlogService = class BlogService {
    constructor(blogRepository, userService) {
        this.blogRepository = blogRepository;
        this.userService = userService;
    }
    create(user, blogEntry) {
        blogEntry.author = user;
        return this.generateSlug(blogEntry.title).pipe((0, rxjs_1.switchMap)((slug) => {
            blogEntry.slug = slug;
            return (0, rxjs_1.from)(this.blogRepository.save(blogEntry));
        }));
    }
    findAll() {
        return (0, rxjs_1.from)(this.blogRepository.find({ relations: ['author'] }));
    }
    paginateAll(options) {
        return (0, rxjs_1.from)((0, nestjs_typeorm_paginate_1.paginate)(this.blogRepository, options, {
            relations: ['author'],
        })).pipe((0, rxjs_1.map)((blogEntries) => blogEntries));
    }
    paginateByUser(options, userId) {
        return (0, rxjs_1.from)((0, nestjs_typeorm_paginate_1.paginate)(this.blogRepository, options, {
            relations: ['author'],
            where: [{ author: { id: userId } }],
        })).pipe((0, rxjs_1.map)((blogEntries) => blogEntries));
    }
    findByUser(userId) {
        return (0, rxjs_1.from)(this.blogRepository.find({
            where: { author: { id: userId } },
            relations: ['author'],
        }));
    }
    findOne(id) {
        return (0, rxjs_1.from)(this.blogRepository.findOne({ where: { id }, relations: ['author'] }));
    }
    updateOne(id, blogEntry) {
        return (0, rxjs_1.from)(this.blogRepository.update(id, blogEntry)).pipe((0, rxjs_1.switchMap)(() => this.findOne(id)));
    }
    deleteOne(id) {
        return (0, rxjs_1.from)(this.blogRepository.delete(id));
    }
    generateSlug(title) {
        return (0, rxjs_1.of)(slugify(title));
    }
};
exports.BlogService = BlogService;
exports.BlogService = BlogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(blog_entry_entity_1.BlogEntryEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        user_service_1.UserService])
], BlogService);
//# sourceMappingURL=blog.service.js.map