import { User } from 'src/app/modules/user/models/user';

export class AuthenticatedUser extends User {
  token: string;
}
