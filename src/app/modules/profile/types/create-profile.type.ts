import { Profile } from '../models';

export type TCreateProfile = Pick<Profile, 'firstName' | 'lastName'>;
