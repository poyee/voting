import { User } from './user.model';

export class JwtResponse {
  accessToken: string;
  user: User;
}
