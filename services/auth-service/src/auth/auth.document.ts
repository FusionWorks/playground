export class AuthDocument {
  static collectionName = 'users';

  id: string;
  email: string;
  password: string;
  hashedRefreshToken?: string;
}
