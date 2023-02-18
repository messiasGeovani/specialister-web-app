export class AbstractResponse<T> {
  message: string;
  hasError: boolean;
  data: T;
  model: T;
}