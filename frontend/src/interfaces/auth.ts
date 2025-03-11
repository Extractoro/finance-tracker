export interface ISignUpFormData {
  name: string;
  email: string;
  password: string;
}

export interface ISignInFormData {
  email: string;
  password: string;
}

export interface IForgetPasswordFormData {
  email: string;
}

export interface IResetPasswordFormData {
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}