export interface User {
  id: string;
  email: string;
  name?: string;
  phoneNumber?: string;
  role: 'ADMIN' | 'DIRECTOR' | 'MUSICIAN';
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  newUser: boolean;
  message: string;
}

export interface GoogleAuthRequest {
  token: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
