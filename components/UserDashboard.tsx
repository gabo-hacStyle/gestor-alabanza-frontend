'use client';

export default function UserDashboard() {
  const misServicios = [
    {
      id: 1,
      nombre: 'Servicio Dominical',
      fecha: '2024-01-15',
      hora: '10:00 AM',
      rol: 'Músico',
      estado: 'Confirmado'
    },
    {
      id: 2,
      nombre: 'Servicio de Oración',
      fecha: '2024-01-17',
      hora: '7:00 PM',
      rol: 'Lector',
      estado: 'Pendiente'
    },
    {
      id: 3,
      nombre: 'Servicio Especial',
      fecha: '2024-01-20',
      hora: '6:00 PM',
      rol: 'Músico',
      estado: 'Confirmado'
    }
  ];

  const proximosServicios = [
    {
      id: 4,
      nombre: 'Servicio Dominical',
      fecha: '2024-01-22',
      hora: '10:00 AM',
      rol: 'Lector'
    },
    {
      id: 5,
      nombre: 'Servicio de Oración',
      fecha: '2024-01-24',
      hora: '7:00 PM',
      rol: 'Músico'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Mis Servicios</h2>
        
        <div className="space-y-3">
          {misServicios.map((servicio) => (
            <div key={servicio.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">{servicio.nombre}</h3>
                <p className="text-sm text-gray-600">
                  {servicio.fecha} • {servicio.hora}
                </p>
                <p className="text-sm text-blue-600">Rol: {servicio.rol}</p>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  servicio.estado === 'Confirmado' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {servicio.estado}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Próximos Servicios</h2>
        
        <div className="space-y-3">
          {proximosServicios.map((servicio) => (
            <div key={servicio.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">{servicio.nombre}</h3>
                <p className="text-sm text-gray-600">
                  {servicio.fecha} • {servicio.hora}
                </p>
                <p className="text-sm text-blue-600">Rol: {servicio.rol}</p>
              </div>
              <div className="text-right">
                <span className="text-sm text-gray-600">Próximo</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-medium text-gray-900 mb-2">Servicios Este Mes</h3>
          <p className="text-3xl font-bold text-blue-600">5</p>
          <p className="text-sm text-gray-600">Asignados</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-medium text-gray-900 mb-2">Próximo Servicio</h3>
          <p className="text-lg font-bold text-green-600">22 Ene</p>
          <p className="text-sm text-gray-600">Servicio Dominical</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Información Personal</h2>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Nombre:</span>
            <span className="font-medium">Juan Pérez</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Rol Principal:</span>
            <span className="font-medium">Músico</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Servicios Participados:</span>
            <span className="font-medium">15</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Estado:</span>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
              Activo
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 