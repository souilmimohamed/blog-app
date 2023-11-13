"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerOptions = void 0;
const nest_winston_1 = require("nest-winston");
const winston = require("winston");
exports.loggerOptions = {
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.timestamp(), winston.format.ms(), nest_winston_1.utilities.format.nestLike()),
        }),
        new winston.transports.Http({
            format: winston.format.combine(winston.format.timestamp(), winston.format.ms(), nest_winston_1.utilities.format.nestLike()),
        }),
        new winston.transports.File({
            level: 'info',
            filename: './logs/all-logs.log',
            handleExceptions: true,
            maxsize: 5242880,
            maxFiles: 5,
        }),
        new winston.transports.File({
            level: 'error',
            filename: './logs/errors.log',
            handleExceptions: true,
            maxsize: 5242880,
            maxFiles: 5,
        }),
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: './logs/exceptions.log',
            maxsize: 5242880,
        }),
    ],
    exitOnError: false,
    format: winston.format.combine(winston.format.json(), winston.format.timestamp({ format: 'DD/MM/YYYY HH:mm:ss' }), winston.format.printf((info) => {
        return `${info.timestamp} [${info.level}] --> ${info.message}`;
    })),
};
//# sourceMappingURL=winston-logger.config.js.map