import { Person } from './person';
import { Professional } from './professional';

export class Profile {
  bio: string;
  Image: string | File;
  completed?: boolean;
  personalData: Person;
  professionalData: Professional;
}
