'use client';

import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { assignClothesColorToService } from '@/service/backend/director';

interface ServiceCardProps {
  service: Service;
  showActions?: boolean;
  roles?: string[];
  onAddSongs?: (serviceId: string) => void;
  onEditServices?: (serviceId: string) => void;
  onEditSongs?: (serviceId: string) => void;
  onDelete?: (serviceId: string) => void;
  instrument?: string;
  allowSetClothesColor?: boolean;
  setBringDataAgain?: (bring: boolean) => void;
}

export default function ServiceCard({ 
  service, 
  showActions = false, 
  roles,
  onEditServices, 
  onEditSongs,
  allowSetClothesColor,
  onAddSongs,
  instrument,setBringDataAgain
}: ServiceCardProps) {
  const [colorModalOpen, setColorModalOpen] = useState(false);
  const [colorInput, setColorInput] = useState('');
  const [clothesColor, setClothesColor] = useState<string>(''); 


  useEffect(() => {
    const putColorBackend = async () => {
        try{
            await assignClothesColorToService(clothesColor, service.id);
            alert('Color de vestimenta asignado correctamente');
        } catch (error) {
            console.error('Error al asignar color de vestimenta:', error);
            alert('No tienes permisos para asignar el color de vestimenta');   
        }
    }
    if (clothesColor.length > 0) {
      putColorBackend();
      if (setBringDataAgain) {
        setBringDataAgain(true);
      }
    }
  }, [clothesColor]); 


  const parseDateLocal = (dateString: string) => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };
  
  const formatDate = (dateString: string) => {
    try {
      const date = parseDateLocal(dateString);
      return format(date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es });
    } catch {
      return dateString;
    }
  };
  const phone = "573132946357";
  
  const message = encodeURIComponent(`
    Hola pastor Adrian, le comento que revisando mi agenda, no podré servir en el servicio del
   ${formatDate(service.serviceDate)} como ${instrument || 'instrumento no especificado'}. Entonces quisiera solicitar el cambio con algun otro salmista que si se encuentre disponible. Quedo atento cualquier cambio, gracias`);
  
   const whatsappUriChangeLinkRequest = `https://wa.me/${phone}?text=${message}`

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      {/* Header con fecha del servicio */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">
              Servicio del {formatDate(service.serviceDate)}
            </h3>
            
          </div>
          {showActions && (
            <div className="flex gap-2">
              {onEditServices && roles?.includes('ADMIN') && (
                <button
                  onClick={() => onEditServices(service.id)}
                  className="p-2 bg-blue-500 hover:bg-blue-600 rounded-md transition-colors"
                  title="Editar servicio"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              )}
            </div>
          )}
          {instrument && (
            <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"  >
              <a href={whatsappUriChangeLinkRequest}> Solicitar cambio</a>
            </button>
          )}
          
        </div>
      </div>

      <div className="p-4 space-y-4">
        

        <div className='flex items-center gap-2.5'>
          {(!service.songsList && roles?.includes('DIRECTOR') && onAddSongs) ? (
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
             {allowSetClothesColor && (
              <button
                className="inline-flex items-center px-3 py-1 underline  text-sm rounded text-green-600 mb-2"
                onClick={() => setColorModalOpen(true)}
              >
                Definir color de vestimenta
              </button>
            )}
        </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a4 4 0 004-4v-1A4 4 0 0016 11h-1m-4-3h-.01M7 21h10a2 2 0 002-2v-1a2 2 0 00-2-2H7a2 2 0 00-2 2v1a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Color de vestimenta:</span>
            </div>
              <p className="ml-6 text-gray-900">{service.clothesColor || 'No definido aun'}</p>
          </div>

        {/* Canciones */}
        {service.songsList && service.songsList.length > 0 && (
          <div className="space-y-2">

            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Canciones ({service.songsList.length}):</span>
            </div>

            {(roles?.includes('DIRECTOR') && onEditSongs) ? (
              <button
                type="button"
                className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors mb-2"
                onClick={() => onEditSongs && onEditSongs(service.id)}
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

         {/* Directores */}
         <div className="space-y-2">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-sm font-medium text-gray-700">Directores:</span>
          </div>
          <div className="ml-6 flex justify-between items-center">
            {service.directors && service.directors.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {service.directors.map((director) => (
                  <span
                    key={director.id}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    {director.name}
                   
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
                {service.musiciansList.map((mList, idx) => {
                  // mList.musician is an array of User objects
                  const names = (mList.musician || []).map(u => u.name).join(' / ');
                  return (
                    <span
                      key={`${mList.instrument}-${idx}`}
                      className="inline-flex items-center gap-1 px-2 py-1 text-black border border-gray-300 rounded-md"
                    >
                      {names} - {mList.instrument}
                    </span>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No hay músicos asignados</p>
            )}
          </div>
        </div>

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
              {formatDate(service.practiceDate)} 
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


      {/* color chooser modal */}
      {colorModalOpen && setClothesColor && (
        <div className="fixed text-gray-900 inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Color de vestimenta para el servicio</h2>
            <input
              type="text"
              value={colorInput}
              onChange={(e) => setColorInput(e.target.value)}
              placeholder="Ingrese color"
              className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setColorModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => {
                  setClothesColor(colorInput);
                  setColorModalOpen(false);
                }}
              >
                Guardar color
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
