import { User } from 'src/app/modules/user/models/user';

export type TAuth = Omit<User, 'role' | 'email'>;
