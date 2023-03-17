import { HttpStatus } from './http-status';

export class HttpResponse<T> extends HttpStatus {
  data: T;
}
