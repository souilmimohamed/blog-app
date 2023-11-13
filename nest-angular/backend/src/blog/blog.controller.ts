import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { Observable, of } from 'rxjs';
import { BlogEntry } from './models/blog-entry.interface';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UserIsAuthorGuard } from './guards/user-is-author.guard';
import { Pagination } from 'nestjs-typeorm-paginate';
import { FileInterceptor } from '@nestjs/platform-express';
import { blogImagestorage } from 'src/utils';
import { Image } from './models/image.interface';
import { join } from 'path';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { BlogEntryEntity } from './models/blog-entry.entity';
export const BLOG_ENTRIES_URL = 'http://localhost:5000/api/blogs';
@ApiTags('Blogs')
@Controller('blogs')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @ApiBody({ type: BlogEntryEntity })
  @UseGuards(JwtGuard)
  @Post()
  create(@Body() blogEntry: BlogEntry, @Request() req): Observable<BlogEntry> {
    const user = req.user;
    return this.blogService.create(user, blogEntry);
  }

  @Get('')
  index(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    limit = limit > 100 ? 100 : limit;
    return this.blogService.paginateAll({
      limit: Number(limit),
      page: Number(page),
      route: BLOG_ENTRIES_URL,
    });
  }

  @Get('user/:user')
  indexByUser(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Param('user') userId: number,
  ): Observable<Pagination<BlogEntry>> {
    limit = limit > 100 ? 100 : limit;
    return this.blogService.paginateByUser(
      {
        limit,
        page,
        route: 'http://localhost:5000/api/blogs',
      },
      userId,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: number): Observable<BlogEntry> {
    return this.blogService.findOne(id);
  }

  @UseGuards(JwtGuard, UserIsAuthorGuard)
  @Put(':id')
  updateOne(
    @Param('id') id: number,
    @Body() blogEntry: BlogEntry,
  ): Observable<BlogEntry> {
    return this.blogService.updateOne(id, blogEntry);
  }

  @UseGuards(JwtGuard, UserIsAuthorGuard)
  @Delete(':id')
  deleteOne(@Param('id') id: number): Observable<any> {
    return this.blogService.deleteOne(id);
  }

  @UseGuards(JwtGuard)
  @Post('image/upload')
  @UseInterceptors(FileInterceptor('file', blogImagestorage))
  uploadFile(@UploadedFile() file, @Request() req): Observable<Image> {
    return of(file);
  }

  @Get('image/:imagename')
  findImage(@Param('imagename') imagename, @Res() res): Observable<Object> {
    return of(
      res.sendFile(
        join(process.cwd(), 'uploads/blog-entry-images/' + imagename),
      ),
    );
  }
}
