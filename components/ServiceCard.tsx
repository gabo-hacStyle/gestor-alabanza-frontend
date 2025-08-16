'use client';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface ServiceCardProps {
  service: Service;
  showActions?: boolean;
  role?: string;
  onAddSongs?: (serviceId: string) => void;
  onEdit?: (serviceId: string) => void;
  onDelete?: (serviceId: string) => void;
}

export default function ServiceCard({ 
  service, 
  showActions = false, 
  role,
  onEdit, 
  onDelete,
  onAddSongs
}: ServiceCardProps) {


  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'EEEE, d \'de\' MMMM \'de\' yyyy', { locale: es });
    } catch {
      return dateString;
    }
  };

  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'HH:mm');
    } catch {
      return '';
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-red-100 text-red-800';
      case 'DIRECTOR':
        return 'bg-blue-100 text-blue-800';
      case 'MUSICIAN':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      {/* Header con fecha del servicio */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">
              Servicio del {formatDate(service.serviceDate)}
            </h3>
            <p className="text-blue-100 text-sm">
              {formatTime(service.serviceDate)}
            </p>
          </div>
          {showActions && (
            <div className="flex gap-2">
              {onEdit && role === 'ADMIN' && (
                <button
                  onClick={() => onEdit(service.id)}
                  className="p-2 bg-blue-500 hover:bg-blue-600 rounded-md transition-colors"
                  title="Editar servicio"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              )}
              {onDelete && role === 'ADMIN' && (
                <button
                  onClick={() => onDelete(service.id)}
                  className="p-2 bg-red-500 hover:bg-red-600 rounded-md transition-colors"
                  title="Eliminar servicio"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="p-4 space-y-4">

         {/* Directores */}
         <div className="space-y-2">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">Directores:</span>
          </div>
          <div className="ml-6">
            {service.directors && service.directors.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {service.directors.map((director) => (
                  <span
                    key={director.id}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    {director.name}
                    <span className={`px-1.5 py-0.5 text-xs rounded ${getRoleBadgeColor(director.role)}`}>
                      {director.role}
                    </span>
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No hay directores asignados</p>
            )}
          </div>
        </div>

        {/* Músicos */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
            <span className="text-sm font-medium text-gray-700">Músicos:</span>
          </div>
          <div className="ml-6">
            {service.musiciansList && service.musiciansList.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {service.musiciansList.map((musician) => (
                  <span
                    key={musician.musician.id}
                    className="inline-flex items-center gap-1 px-2 py-1 text-black border border-gray-300 rounded-md"
                  >
                    
                    {musician.musician.name} - {musician.instrument}
                    
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No hay músicos asignados</p>
            )}
          </div>
        </div>


        {(!service.songsList && role === 'DIRECTOR' && onAddSongs) ? (
              <>
              <button
                type="button"
                className="inline-flex items-center px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors mb-2"
                onClick={() => onAddSongs && onAddSongs(service.id)}
                title="Agregar canciones"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Agregar canciones
              </button>
              </>
            ) : null}

        {/* Canciones */}
        {service.songsList && service.songsList.length > 0 && (
          <div className="space-y-2">

            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Canciones ({service.songsList.length}):</span>
            </div>

            {(role === 'DIRECTOR' && onEdit) ? (
              <button
                type="button"
                className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors mb-2"
                onClick={() => onEdit && onEdit(service.id)}
                title="Editar canciones"
              >
                {/* Icono de edición (lápiz) */}
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H7v-3.414a2 2 0 01.586-1.414z" />
                </svg>
                Editar listado 
              </button>
            ) : null}

            <div className="ml-6">
              <div className="space-y-2">
                {service.songsList.map((song, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{song.name}</p>
                      <p className="text-sm text-gray-600">{song.artist}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                        {song.tone}
                      </span>
                      {song.youtubeLink && (
                        <a
                          href={song.youtubeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 text-red-600 hover:text-red-800 transition-colors"
                          title="Ver en YouTube"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* Información básica */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Ensayo:</span>
            </div>
            <p className="text-gray-900 ml-6">
              {formatDate(service.practiceDate)} a las {formatTime(service.practiceDate)}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Sede:</span>
            </div>
            <p className="text-gray-900 ml-6">{service.location}</p>
          </div>
        </div>
  
      </div>
    </div>
  );
}
