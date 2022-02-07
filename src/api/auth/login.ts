export interface LoginResponse {
  token: string;
}

export interface JwtPayload {
  sub: string;
  name: string;
}
