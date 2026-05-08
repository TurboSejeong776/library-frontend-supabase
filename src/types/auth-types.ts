//These are for register
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterData {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: RegisterData;
}

/////////////////////////

//These are for logins
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginUser {
  id: number;
  name: string;
  email: string;
  role: string; // either 'USER' or 'ADMIN'
}

export interface LoginData {
  token: string;
  user: LoginUser;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: LoginData;
}
