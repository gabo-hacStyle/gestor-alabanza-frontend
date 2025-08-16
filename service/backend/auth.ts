'use server'

import { cookies } from 'next/headers';
import { AuthResponse, GoogleAuthRequest } from '@/types/auth';

import { BASE_URL } from './urls';



export async function authenticateWithGoogle(googleToken: string): Promise<AuthResponse> {

  console.log(googleToken);
  console.log("Type of googleToken: ", typeof googleToken);
  try {
    const response = await fetch(`${BASE_URL}/auth/google`, {
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
   
    
    // Guardar token en cookie segura (24 horas = 86400 segundos)
    const cookieStore = await cookies();
    cookieStore.set('auth_token', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 5184000, // 2 meses (igual que el JWT del backend)
      path: '/',
    });

    // Guardar información del usuario en cookie (24 horas)
    cookieStore.set('user_info', JSON.stringify(data.user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 5184000, // 2 meses (igual que el JWT del backend)
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