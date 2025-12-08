export interface AuthSignUpParams {
  name: string;
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  isEmailVerified: boolean;
}

export interface AuthCredentials {
  accessToken: string;
  user: AuthUser;
}
