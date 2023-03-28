import { HttpStatus } from './http-status';

export class Response<T> extends HttpStatus {
  data: T;
}
