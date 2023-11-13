import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';
import { WinstonModule } from 'nest-winston';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABSE_URL,
      autoLoadEntities: true,
      synchronize: true,
      host: 'localhost',
      username: 'postgres',
      password: 'postgrespw',
      port: 5432,
    }),
    UserModule,
    BlogModule,
    WinstonModule.forRoot({}),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
