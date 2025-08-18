'use client';

import Navbar from '@/components/Navbar';
import ServiceCard from '@/components/ServiceCard';
import { useEffect, useState } from 'react';
import { getAllServices } from '@/service/backend/service';
import { useRouter } from 'next/navigation';
import { getUserInfo } from '@/service/backend/auth';

export default function Servicios() {
  const router = useRouter();
  const [servicios, setServicios] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getAllServices();
        const userInfo = await getUserInfo();
        setServicios(response);
        setRoles(userInfo?.roles || []);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Error al cargar los servicios');
      } finally {
        setLoading(false);
      }
    };
    
    fetchServicios();
  }, []);

  const handleEditServiceAssignments = (serviceId: string) => {
    console.log('Editar servicio:', serviceId);
    // Navegar a la página de edición de asignaciones
    router.push(`/admin/servidores/${serviceId}`);
  };

  const handleDeleteService = (serviceId: string) => {
    // Implementar eliminación de servicio
    console.log('Eliminar servicio:', serviceId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Todos los Servicios</h1>
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Cargando servicios...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Todos los Servicios</h1>
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="text-red-600 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Reintentar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Todos los Servicios</h1>
          <div className="text-sm text-gray-600">
            {servicios.length} servicio{servicios.length !== 1 ? 's' : ''} encontrado{servicios.length !== 1 ? 's' : ''}
          </div>
        </div>
        
        {servicios.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay servicios</h3>
            <p className="text-gray-600">Aún no se han creado servicios en la plataforma.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {servicios.map((servicio) => (
              <ServiceCard
                key={servicio.id}
                service={servicio}
                showActions={roles?.includes('ADMIN')}
                roles={roles || []}
                onEditServices={handleEditServiceAssignments}
                onDelete={handleDeleteService}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 