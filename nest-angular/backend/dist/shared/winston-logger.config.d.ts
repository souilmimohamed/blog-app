import * as winston from 'winston';
export declare const loggerOptions: {
    transports: (winston.transports.ConsoleTransportInstance | winston.transports.HttpTransportInstance | winston.transports.FileTransportInstance)[];
    exceptionHandlers: winston.transports.FileTransportInstance[];
    exitOnError: boolean;
    format: winston.Logform.Format;
};
