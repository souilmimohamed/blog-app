export interface HttpResponseModel<T> {
  Success: boolean;
  Errors: string | ResponseError[];
  Warning: string | string[];
  Info: string | string[];
  Body: T;
}

export interface ResponseError {
  Key: string;
  Value: string;
}
