"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const nest_winston_1 = require("nest-winston");
const winston_logger_config_1 = require("./shared/winston-logger.config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: nest_winston_1.WinstonModule.createLogger(winston_logger_config_1.loggerOptions),
    });
    app.setGlobalPrefix('api');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('nest-backend')
        .setDescription('nest backend for full stack app')
        .setVersion('1.0')
        .addBearerAuth({ in: 'header', type: 'http' })
        .build();
    const options = {
        operationIdFactory: (controllerKey, methodKey) => methodKey,
        deepScanRoutes: true,
    };
    const document = swagger_1.SwaggerModule.createDocument(app, config, options);
    swagger_1.SwaggerModule.setup('', app, document);
    await app.listen(5000);
}
bootstrap();
//# sourceMappingURL=main.js.map