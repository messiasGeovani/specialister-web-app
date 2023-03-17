import { Auth } from './auth';

export class AuthenticatedUser extends Auth {
  token: string;
}
