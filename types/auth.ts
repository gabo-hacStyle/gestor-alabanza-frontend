
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
  isAuthenticated: boolean;
  isLoading: boolean;
}
