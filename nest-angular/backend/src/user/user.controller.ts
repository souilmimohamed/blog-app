import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFile,
  Request,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User, UserRole } from './models/user.interface';
import { Observable, catchError, map, of } from 'rxjs';
import { hasRoles } from 'src/auth/decorators/role.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Pagination } from 'nestjs-typeorm-paginate';
import { FileInterceptor } from '@nestjs/platform-express';
import { userProfileImagestorage } from '../utils';
import { join } from 'path';
import { UserIsUserGuard } from 'src/auth/guards/userIsUser.guard';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './models/user.entity';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @ApiBody({
    type: UserEntity,
  })
  @Post()
  createOne(@Body() user: User): Observable<User | Object> {
    return this.userService.create(user).pipe(
      map((user: User) => user),
      catchError((err) => of({ error: err.message })),
    );
  }
  @ApiParam({ name: 'id', type: 'number' })
  @Get(':id')
  findOne(@Param() params): Observable<User | {}> {
    return this.userService.findOne(params.id);
  }

  @Get()
  index(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('username') username: string,
  ): Observable<Pagination<User>> {
    limit = limit > 100 ? 100 : limit;
    if (username === null || username === undefined)
      return this.userService.paginate({
        limit,
        page,
        route: 'hhtp://localhost:5000/api/users',
      });
    else
      return this.userService.paginateFilterByUsername(
        {
          limit,
          page,
          route: 'hhtp://localhost:5000/api/users',
        },
        { username },
      );
  }

  @ApiParam({ name: 'id', type: 'number' })
  @UseGuards(JwtGuard, RolesGuard)
  @hasRoles(UserRole.ADMIN)
  @Delete(':id')
  deleteOne(@Param('id') id: string): Observable<User> {
    return this.userService.deleteOne(Number(id));
  }
  @ApiBody({ type: UserEntity })
  @UseGuards(JwtGuard, UserIsUserGuard)
  @Put(':id')
  updateOne(@Param('id') id: string, @Body() user: User): Observable<any> {
    return this.userService.updateOne(Number(id), user);
  }

  @Post('login')
  login(@Body() user: User): Observable<Object> {
    return this.userService.login(user).pipe(
      map((jwt: string) => {
        return { access_token: jwt };
      }),
    );
  }
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: UserEntity })
  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Put(':id/role')
  updateRoleUser(
    @Param('id') id: string,
    @Body() user: User,
  ): Observable<User> {
    return this.userService.updateRoleUser(Number(id), user);
  }

  @UseGuards(JwtGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', userProfileImagestorage))
  uploadFile(@UploadedFile() file, @Request() req): Observable<Object> {
    const user: User = req.user;
    return this.userService
      .updateOne(user.id, { profileImage: file.filename })
      .pipe(map((user: User) => ({ profileImage: user.profileImage })));
  }
  @Get('profile-image/:imagename')
  findProfileImage(
    @Param('imagename') imagename,
    @Res() res,
  ): Observable<Object> {
    return of(
      res.sendFile(join(process.cwd(), 'uploads/profileImages/' + imagename)),
    );
  }
}
