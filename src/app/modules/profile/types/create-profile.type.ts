import { Person } from '../models';

export type TCreateProfile = Pick<Person, 'firstName' | 'lastName'>;
