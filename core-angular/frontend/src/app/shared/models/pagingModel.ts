export interface PagingRequestModel {
  PageNumber: number;
  PageSize: number;
}

export interface PagingResponseModel<T> {
  TotalCount: number;
  PageSize: number;
  CurrentPage: number;
  TotalPages: number;
  Items: T[];
}
