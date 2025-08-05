'use client';

import Navbar from '@/components/Navbar';

export default function Servicios() {
  // Datos simulados de servicios
  const servicios = [
    {
      id: 1,
      nombre: 'Servicio Dominical',
      fecha: '2024-01-15',
      hora: '10:00 AM',
      estado: 'Programado',
      servidores: ['Juan Pérez', 'María García', 'Carlos López']
    },
    {
      id: 2,
      nombre: 'Servicio de Oración',
      fecha: '2024-01-17',
      hora: '7:00 PM',
      estado: 'Programado',
      servidores: ['Ana Rodríguez', 'Pedro Martínez']
    },
    {
      id: 3,
      nombre: 'Servicio Especial',
      fecha: '2024-01-20',
      hora: '6:00 PM',
      estado: 'Programado',
      servidores: ['Luis Hernández', 'Carmen Silva', 'Roberto Díaz']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Todos los Servicios</h1>
        
        <div className="space-y-4">
          {servicios.map((servicio) => (
            <div key={servicio.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{servicio.nombre}</h3>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  servicio.estado === 'Programado' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {servicio.estado}
                </span>
              </div>
              
              <div className="text-sm text-gray-600 mb-3">
                <p>Fecha: {servicio.fecha}</p>
                <p>Hora: {servicio.hora}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Servidores:</p>
                <div className="flex flex-wrap gap-1">
                  {servicio.servidores.map((servidor, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                    >
                      {servidor}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 