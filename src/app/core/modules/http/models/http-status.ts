export class HttpStatus {
  status: number;
  statusText: string;
  errors: string[];
  constructor(status: number, statusText: string, errors: string[]) {
    this.status = status;
    this.statusText = statusText;
    this.errors = errors;
  }
}
