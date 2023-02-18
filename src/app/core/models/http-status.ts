export class HttpStatus {
  status: number;
  statusText: string;
  message: string;
  constructor(status: number, statusText: string, message: string) {
    this.status = status;
    this.statusText = statusText;
    this.message = message;
  }
}
