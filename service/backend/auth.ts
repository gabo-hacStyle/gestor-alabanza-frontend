'use server'

import { cookies } from 'next/headers';
import { AuthResponse, GoogleAuthRequest } from '@/types/auth';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';

export async function authenticateWithGoogle(googleToken: string): Promise<AuthResponse> {

  console.log(googleToken);
  console.log("Type of googleToken: ", typeof googleToken);
  try {
    const response = await fetch(`${BACKEND_URL}/api/auth/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: googleToken
      } as GoogleAuthRequest),
    });

    if (!response.ok) {
      throw new Error(`Error de autenticación: ${response.status}`);
    }

    const data: AuthResponse = await response.json();

    console.log(data);
   
    
    // Guardar token en cookie segura
    const cookieStore = await cookies();
    cookieStore.set('auth_token', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 días
      path: '/',
    });

    // Guardar información del usuario en cookie
    cookieStore.set('user_info', JSON.stringify(data.user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 días
      path: '/',
    });

    return data;
  } catch (error) {
    console.error('Error en autenticación:', error);
    throw error;
  }
}

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get('auth_token')?.value || null;
}

export async function getUserInfo(): Promise<any | null> {
  const cookieStore = await cookies();
  const userInfo = cookieStore.get('user_info')?.value;
  return userInfo ? JSON.parse(userInfo) : null;
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('auth_token');
  cookieStore.delete('user_info');
}

export async function isAuthenticated(): Promise<boolean> {
  const token = await getAuthToken();
  return !!token;
}