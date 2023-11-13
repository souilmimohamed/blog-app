import { ResponseError } from '../models/httpResponseModel';

export function parseError(errors: string | ResponseError[]): string[] {
  let result: string[] = [];
  if (typeof errors === 'string') result.push(errors);
  else {
    const responseErrors = errors as ResponseError[];
    for (let index = 0; index < responseErrors.length; index++) {
      const element = responseErrors[index];
      result.push(element.Value);
    }
  }
  return result;
}
