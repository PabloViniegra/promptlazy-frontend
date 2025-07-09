export interface AuthRegisterRequest {
  email: string;
  password: string;
  username: string;
  full_name: string;
}

export interface AuthFullResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface AuthLoginRequest {
  email: string;
  password: string;
}

export interface AuthRefreshRequest {
  refresh_token: string;
}

export interface AuthPartialResponse {
  access_token: string;
  token_type: string;
}

export interface Me {
  id: string;
  email: string;
  username: string;
  full_name: string;
}

export interface UpdateUserRequest {
  current_password?: string;
  new_password?: string;
  full_name?: string;
  email?: string;
  username?: string;
}

export interface FormData {
  email: string;
  username: string;
  full_name: string;
  current_password: string;
  new_password: string;
  confirm_password: string;
}
