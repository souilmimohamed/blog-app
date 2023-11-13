"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogImagestorage = exports.userProfileImagestorage = void 0;
const multer_1 = require("multer");
const uuid_1 = require("uuid");
const path = require("path");
exports.userProfileImagestorage = {
    storage: (0, multer_1.diskStorage)({
        destination: './uploads/profileimages',
        filename: (req, file, cb) => {
            const filename = path.parse(file.originalname).name.replace(/\s/g, '') + (0, uuid_1.v4)();
            const extension = path.parse(file.originalname).ext;
            cb(null, `${filename}${extension}`);
        },
    }),
};
exports.blogImagestorage = {
    storage: (0, multer_1.diskStorage)({
        destination: './uploads/blog-entry-images',
        filename: (req, file, cb) => {
            const filename = path.parse(file.originalname).name.replace(/\s/g, '') + (0, uuid_1.v4)();
            const extension = path.parse(file.originalname).ext;
            cb(null, `${filename}${extension}`);
        },
    }),
};
//# sourceMappingURL=index.js.map