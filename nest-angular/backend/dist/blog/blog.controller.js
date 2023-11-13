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
exports.BlogController = exports.BLOG_ENTRIES_URL = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const blog_service_1 = require("./blog.service");
const rxjs_1 = require("rxjs");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const user_is_author_guard_1 = require("./guards/user-is-author.guard");
const platform_express_1 = require("@nestjs/platform-express");
const utils_1 = require("../utils");
const path_1 = require("path");
const swagger_1 = require("@nestjs/swagger");
const blog_entry_entity_1 = require("./models/blog-entry.entity");
exports.BLOG_ENTRIES_URL = 'http://localhost:5000/api/blogs';
let BlogController = class BlogController {
    constructor(blogService) {
        this.blogService = blogService;
    }
    create(blogEntry, req) {
        const user = req.user;
        return this.blogService.create(user, blogEntry);
    }
    index(page = 1, limit = 10) {
        limit = limit > 100 ? 100 : limit;
        return this.blogService.paginateAll({
            limit: Number(limit),
            page: Number(page),
            route: exports.BLOG_ENTRIES_URL,
        });
    }
    indexByUser(page = 1, limit = 10, userId) {
        limit = limit > 100 ? 100 : limit;
        return this.blogService.paginateByUser({
            limit,
            page,
            route: 'http://localhost:5000/api/blogs',
        }, userId);
    }
    findOne(id) {
        return this.blogService.findOne(id);
    }
    updateOne(id, blogEntry) {
        return this.blogService.updateOne(id, blogEntry);
    }
    deleteOne(id) {
        return this.blogService.deleteOne(id);
    }
    uploadFile(file, req) {
        return (0, rxjs_1.of)(file);
    }
    findImage(imagename, res) {
        return (0, rxjs_1.of)(res.sendFile((0, path_1.join)(process.cwd(), 'uploads/blog-entry-images/' + imagename)));
    }
};
exports.BlogController = BlogController;
__decorate([
    (0, swagger_1.ApiBody)({ type: blog_entry_entity_1.BlogEntryEntity }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], BlogController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(''),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "index", null);
__decorate([
    (0, common_1.Get)('user/:user'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Param)('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], BlogController.prototype, "indexByUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], BlogController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, user_is_author_guard_1.UserIsAuthorGuard),
    (0, common_1.Put)(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], BlogController.prototype, "updateOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, user_is_author_guard_1.UserIsAuthorGuard),
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], BlogController.prototype, "deleteOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Post)('image/upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', utils_1.blogImagestorage)),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], BlogController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)('image/:imagename'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('imagename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], BlogController.prototype, "findImage", null);
exports.BlogController = BlogController = __decorate([
    (0, swagger_1.ApiTags)('Blogs'),
    (0, common_1.Controller)('blogs'),
    __metadata("design:paramtypes", [blog_service_1.BlogService])
], BlogController);
//# sourceMappingURL=blog.controller.js.map