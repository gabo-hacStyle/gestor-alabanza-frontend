'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authenticateWithGoogle } from '@/service/backend/auth';
import { useEffect } from 'react';
import { hasRole } from '@/utils/roleUtils';

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          renderButton: (element: HTMLElement, options: any) => void;
          prompt: () => void;
        };
      };
    };
  }
}

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleGoogleLogin = async (response: any) => {

    console.log(response.credential);
    setIsLoading(true);
    setError(null);

    try {
      const result = await authenticateWithGoogle(response.credential);
      
      if (result.newUser) {
        // Usuario nuevo - redirigir a completar perfil
        router.push('/complete-profile');
      } else {
        // Usuario existente - redirigir según el rol
        if (hasRole(result.user, 'ADMIN')) {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
      }
    } catch (error) {
      console.error('Error en autenticación:', error);
      setError('Error al iniciar sesión. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const initializeGoogleAuth = () => {
    if (typeof window !== 'undefined' && window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleGoogleLogin,
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      window.google.accounts.id.renderButton(
        document.getElementById('google-login-button')!,
        {
          theme: 'outline',
          size: 'large',
          text: 'signin_with',
          shape: 'rectangular',
          width: 300,
        }
      );
    }
  };

  // Cargar Google OAuth cuando el componente se monta
  // Usar useEffect y agregar la etiqueta <script> directamente en el JSX
 
  useEffect(() => {
    // Verifica si el script ya está presente
    const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
    if (existingScript) {
      if (window.google) {
        initializeGoogleAuth();
      } else {
        existingScript.addEventListener('load', initializeGoogleAuth);
      }
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogleAuth;
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Asignacion de servicios
            
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
          <br />
          Alianza Cristiana Neiva
          <br />
            En este momento Gabo le está haciendo mantenimiento a la página .... Esperar!
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          )}
          
          <div className="flex justify-center">
            <div id="google-login-button"></div>
          </div>
          
          {isLoading && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}
          
          
        </div>
      </div>
    </div>
  );
}
