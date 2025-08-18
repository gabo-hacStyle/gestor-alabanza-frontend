'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUserInfo } from '@/service/backend/auth';

import { updateUser } from '@/service/backend/users';

export default function CompleteProfilePage() {
  const [user, setUser] = useState<any>();
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        if (userInfo) {
          setUser(userInfo);
          setFormData({
            name: userInfo.name || '',
            phoneNumber: userInfo.phoneNumber || '',
          });
        }
      } catch (error) {
        console.error('Error cargando información del usuario:', error);
        router.push('/login');
      }
    };

    loadUserInfo();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const responseReal = await updateUser(user.id, {
        name: formData.name,
        phoneNumber: formData.phoneNumber,
      });
      router.push('/dashboard');
      

    } catch (error) {
      console.error('Error actualizando perfil:', error);
      setError('Error al actualizar el perfil. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Completa tu Perfil
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Bienvenido {user.email}! Completa tu información para continuar.
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre Completo
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border text-black  border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tu nombre completo"
              />
            </div>
            
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Número de Teléfono
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tu número de teléfono"
              />
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                'Completar Perfil'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
