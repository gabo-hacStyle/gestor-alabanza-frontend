'use client';

import { useState, useEffect } from 'react';
import { getUserInfo } from '@/service/backend/auth';
import { User } from '@/types/auth';

// Usar el enrutador de Next.js para la navegación
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        setUser(userInfo);
        
        // Verificar que el usuario sea ADMIN
        if (userInfo && userInfo.role !== 'ADMIN') {
          // Redirigir si no es admin
          window.location.href = '/dashboard';
        }
      } catch (error) {
        console.error('Error cargando información del usuario:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserInfo();
  }, []);

  const onClickCrearServicio = () => {
    
    
    router.push('/admin/servicios');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Acceso Denegado
          </h1>
          <p className="text-gray-600">No tienes permisos para acceder a esta sección.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Panel de Administración
        </h1>

        <div className="mt-8 bg-yellow-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-yellow-900 mb-4">
            ⚡ Acciones Rápidas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button onClick={onClickCrearServicio} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Crear Servicio
            </button>
            {/* <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
              Gestionar Usuarios
            </button> */}
{/*            
            <button className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors">
              Configuración
            </button> */}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Gestión de Usuarios */}
          {/* <div className="bg-blue-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-blue-900 mb-4">
              👥 Gestión de Usuarios
            </h2>
            <div className="space-y-2">
              <button className="w-full text-left text-blue-700 hover:text-blue-900">
                Ver todos los usuarios
              </button>
              <button className="w-full text-left text-blue-700 hover:text-blue-900">
                Asignar roles
              </button>
              <button className="w-full text-left text-blue-700 hover:text-blue-900">
                Crear usuario
              </button>
            </div>
          </div> */}

          {/* Gestión de Servicios */}
          <div className="bg-green-50 rounded-lg p-6">
            {/* <h2 className="text-lg font-semibold text-green-900 mb-4">
              📅 Gestión de Servicios
            </h2> */}
            {/* <div className="space-y-2">
              <button className="w-full text-left text-green-700 hover:text-green-900">
                Crear nuevo servicio
              </button>
              <button className="w-full text-left text-green-700 hover:text-green-900">
                Ver todos los servicios
              </button>
              {/* <button className="w-full text-left text-green-700 hover:text-green-900">
                Asignar directores
              </button> 
            </div> */}
          </div>

          {/* Estadísticas */}
          {/* <div className="bg-purple-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-purple-900 mb-4">
              📊 Estadísticas
            </h2>
            <div className="space-y-2">
              <p className="text-purple-700">Total usuarios: <span className="font-bold">0</span></p>
              <p className="text-purple-700">Servicios activos: <span className="font-bold">0</span></p>
              <p className="text-purple-700">Directores: <span className="font-bold">0</span></p>
            </div>
          </div> */}
        </div>

        {/* Acciones Rápidas */}
       

        {/* Información del Sistema */}
        {/* <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            ℹ️ Información del Sistema
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p><span className="font-medium">Usuario actual:</span> {user.name || user.email}</p>
              <p><span className="font-medium">Rol:</span> {user.role}</p>
              <p><span className="font-medium">Email:</span> {user.email}</p>
            </div>
            <div>
              <p><span className="font-medium">Versión:</span> 1.0.0</p>
              <p><span className="font-medium">Última actualización:</span> {new Date().toLocaleDateString()}</p>
              <p><span className="font-medium">Estado:</span> <span className="text-green-600">Activo</span></p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
