'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import SongsForm from '@/components/SongsForm';
import { getServiceById } from '@/service/backend/service';
import { updateSongsList } from '@/service/backend/director';

interface CreateSongBody {
  songName: string;
  composer: string;
  link: string;
  tonality: string;
}

export default function EditarCanciones() {
  const router = useRouter();
  const params = useParams();
  const serviceId = params.id as string;

  const [service, setService] = useState<Service | null>(null);
  const [songs, setSongs] = useState<CreateSongBody[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar información del servicio y canciones existentes
  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        setError(null);
        const serviceData = await getServiceById(serviceId);
        setService(serviceData);
        
        // Convertir las canciones existentes al formato CreateSongBody
        if (serviceData.songsList && serviceData.songsList.length > 0) {
          const existingSongs: CreateSongBody[] = serviceData.songsList.map((song: Song) => ({
            songName: song.name || '',
            composer: song.artist || '',
            link: song.youtubeLink || '',
            tonality: song.tone || 'original'
          }));
          setSongs(existingSongs);
        }
      } catch (err) {
        console.error('Error fetching service:', err);
        setError('Error al cargar la información del servicio');
      } finally {
        setLoading(false);
      }
    };

    if (serviceId) {
      fetchService();
    }
  }, [serviceId]);

  const handleSongsChange = (newSongs: CreateSongBody[]) => {
    setSongs(newSongs);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar que haya al menos una canción
    if (songs.length === 0) {
      alert('Debes tener al menos una canción');
      return;
    }

    // Validar que todas las canciones tengan nombre y compositor
    const invalidSongs = songs.filter(song => !song.songName.trim() || !song.composer.trim());
    if (invalidSongs.length > 0) {
      alert('Todas las canciones deben tener nombre y compositor');
      return;
    }

    try {
      setSaving(true);
      const response = await updateSongsList(serviceId, songs);
      if('status' in response){
        alert(response.message);
        router.push(`/dashboard`);
        return;
      }
      alert('Canciones actualizadas exitosamente');
      router.push(`/dashboard`);
    } catch (error) {
      console.error('Error updating song list:', error);
      alert('Error al actualizar las canciones');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Editar Canciones</h1>
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Cargando información del servicio...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Editar Canciones</h1>
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="text-red-600 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-600 mb-4">{error || 'Servicio no encontrado'}</p>
              <button
                onClick={() => router.push('/director')}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Volver
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-700">
      <Navbar />
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Editar Canciones</h1>
          <button
            onClick={() => router.push(`/director/canciones/${serviceId}`)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
          >
            Volver
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información del servicio */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Información del Servicio</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Fecha del Servicio:</span>
                <p className="text-gray-900">{new Date(service.serviceDate).toLocaleDateString('es-ES')}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Fecha de Ensayo:</span>
                <p className="text-gray-900">{new Date(service.practiceDate).toLocaleDateString('es-ES')}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Sede:</span>
                <p className="text-gray-900">{service.location}</p>
              </div>
            </div>
          </div>

          {/* Formulario de canciones */}
          <div className="bg-white rounded-lg shadow p-6">
            <SongsForm
              songs={songs}
              onSongsChange={handleSongsChange}
              loading={loading}
              error={error}
            />
          </div>

          {/* Botones */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving || songs.length === 0}
              className="flex-1 bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {saving ? 'Guardando...' : 'Actualizar Canciones'}
            </button>
            <button
              type="button"
              className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-400 transition-colors"
              onClick={() => router.push(`/dashboard`)}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
