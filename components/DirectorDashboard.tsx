'use client';

import Link from 'next/link';

export default function DirectorDashboard() {
  const cancionesRecientes = [
    {
      id: 1,
      titulo: 'Alabaré a mi Señor',
      artista: 'Hillsong',
      genero: 'Alabanza',
      tono: 'C'
    },
    {
      id: 2,
      titulo: 'Santo Santo Santo',
      artista: 'Tradicional',
      genero: 'Adoración',
      tono: 'G'
    },
    {
      id: 3,
      titulo: 'Grande es tu fidelidad',
      artista: 'Chris Tomlin',
      genero: 'Adoración',
      tono: 'D'
    }
  ];

  const serviciosProgramados = [
    {
      id: 1,
      nombre: 'Servicio Dominical',
      fecha: '2024-01-15',
      hora: '10:00 AM',
      canciones: 5
    },
    {
      id: 2,
      nombre: 'Servicio de Oración',
      fecha: '2024-01-17',
      hora: '7:00 PM',
      canciones: 3
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Panel de Director</h2>
        
        <div className="grid grid-cols-1 gap-4">
          <Link
            href="/director/canciones"
            className="flex items-center justify-between p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <div>
              <h3 className="font-medium text-purple-900">Registrar Canciones</h3>
              <p className="text-sm text-purple-700">Agregar nuevas canciones al repertorio</p>
            </div>
            <div className="text-purple-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link
            href="/director/repertorio"
            className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors"
          >
            <div>
              <h3 className="font-medium text-orange-900">Gestionar Repertorio</h3>
              <p className="text-sm text-orange-700">Editar listado y características de canciones</p>
            </div>
            <div className="text-orange-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Canciones Recientes</h2>
          
          <div className="space-y-3">
            {cancionesRecientes.map((cancion) => (
              <div key={cancion.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{cancion.titulo}</h3>
                  <p className="text-sm text-gray-600">
                    {cancion.artista} • {cancion.genero}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-600">Tono: {cancion.tono}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Servicios Programados</h2>
          
          <div className="space-y-3">
            {serviciosProgramados.map((servicio) => (
              <div key={servicio.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{servicio.nombre}</h3>
                  <p className="text-sm text-gray-600">
                    {servicio.fecha} • {servicio.hora}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-600">{servicio.canciones} canciones</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-medium text-gray-900 mb-2">Total Canciones</h3>
          <p className="text-3xl font-bold text-purple-600">45</p>
          <p className="text-sm text-gray-600">En repertorio</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-medium text-gray-900 mb-2">Servicios Este Mes</h3>
          <p className="text-3xl font-bold text-orange-600">8</p>
          <p className="text-sm text-gray-600">Programados</p>
        </div>
      </div>
    </div>
  );
} 