import {
  PagingRequestModel,
  PagingResponseModel,
} from 'src/app/shared/models/pagingModel';

export interface BlogDto {
  Id: number;
  Title: string;
  Slug?: string;
  Description: string;
  Body: string;
  PublisherId?: number;
  HeaderImageUrl?: string;
  CreatedAt?: Date;
  Publisher?: string;
  Likes: number;
}

export interface filter extends PagingRequestModel {
  SearchText: string;
  Publisher: string;
  SortDate: string;
}

export interface blogsResponseModel extends PagingResponseModel<BlogDto> {}
