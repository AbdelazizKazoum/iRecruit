export interface JwtPayload {
  userId: string; // Usually, this will be the user ID
  username: string;
  email: string;
  role: string;
  sub: string;
}
