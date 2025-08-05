'use client';

import Link from 'next/link';

export default function AdminDashboard() {
  const serviciosRecientes = [
    {
      id: 1,
      nombre: 'Servicio Dominical',
      fecha: '2024-01-15',
      hora: '10:00 AM',
      servidores: 5
    },
    {
      id: 2,
      nombre: 'Servicio de Oración',
      fecha: '2024-01-17',
      hora: '7:00 PM',
      servidores: 3
    },
    {
      id: 3,
      nombre: 'Servicio Especial',
      fecha: '2024-01-20',
      hora: '6:00 PM',
      servidores: 8
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Panel de Administración</h2>
        
        <div className="grid grid-cols-1 gap-4">
          <Link
            href="/admin/servicios"
            className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <div>
              <h3 className="font-medium text-blue-900">Crear/Editar Servicios</h3>
              <p className="text-sm text-blue-700">Gestionar servicios y asignar servidores</p>
            </div>
            <div className="text-blue-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link
            href="/admin/servidores"
            className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
          >
            <div>
              <h3 className="font-medium text-green-900">Gestionar Servidores</h3>
              <p className="text-sm text-green-700">Editar información de servidores</p>
            </div>
            <div className="text-green-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Servicios Recientes</h2>
        
        <div className="space-y-3">
          {serviciosRecientes.map((servicio) => (
            <div key={servicio.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">{servicio.nombre}</h3>
                <p className="text-sm text-gray-600">
                  {servicio.fecha} • {servicio.hora}
                </p>
              </div>
              <div className="text-right">
                <span className="text-sm text-gray-600">{servicio.servidores} servidores</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-medium text-gray-900 mb-2">Total Servicios</h3>
          <p className="text-3xl font-bold text-blue-600">12</p>
          <p className="text-sm text-gray-600">Este mes</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-medium text-gray-900 mb-2">Servidores Activos</h3>
          <p className="text-3xl font-bold text-green-600">25</p>
          <p className="text-sm text-gray-600">Disponibles</p>
        </div>
      </div>
    </div>
  );
} 