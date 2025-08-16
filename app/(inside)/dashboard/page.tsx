'use client';

import { useState, useEffect } from 'react';

import { User } from '@/types/auth';
import { getUserById } from '@/service/backend/users';
import UserDashboard from '@/components/UserDashboard';

export default function DashboardPage() {
  const [user, setUser] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const userInfo = await getUserById();
        setUser(userInfo);
      } catch (error) {
        console.error('Error cargando información del usuario:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserInfo();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Error
          </h1>
          <p className="text-gray-600">No se pudo cargar la información del usuario.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
         {/* Mensaje de Bienvenida */}
         <div className="mt-8 bg-yellow-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-yellow-900 mb-2">
            Bienvenido  {user.name}!
          </h2>
         
        </div>
        
        <div className="grid grid-cols-1  gap-6">
          {/* Información del Usuario */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-blue-900 mb-4">
              Información del Usuario
            </h2>
            <div className="space-y-2 text-black">
              <p><span className="font-medium">Nombre:</span> {user.name || 'No especificado'}</p>
              <p><span className="font-medium">Email:</span> {user.email}</p>
              <p><span className="font-medium">Teléfono:</span> {user.phoneNumber || 'No especificado'}</p>
            </div>
          </div>

          {/* Servicios Próximos */}
          <div className="bg-green-50 rounded-lg">
            <h2 className="text-lg font-semibold text-green-900 mb-4">
              Próximos Servicios
            </h2>
            {user && <UserDashboard user={user}/>}
          </div>

          
        </div>

       
      </div>
    </div>
  );
} 