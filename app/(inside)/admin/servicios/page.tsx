'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UsersSelection from '@/components/UsersSelection';
import MusiciansSelection from '@/components/MusiciansSelection';
import { createService } from '@/service/backend/admin';
import { geAlltUsers } from '@/service/backend/users';
import { availableInstruments } from '@/data';

export default function AdminServicios() {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateServiceRequest>({
    serviceDate: '',
    practiceDate: '',
    location: '',
    directorIds: [] as string[],
    musicianAssignments: [] as MusicianAssignment[]
  });

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch único de usuarios
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await geAlltUsers();
        setUsers(data);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Error al cargar usuarios');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDirectorsChange = (directorIds: string[]) => {
    setFormData(prev => ({
      ...prev,
      directorIds
    }));
  };

  const handleMusicianAssignmentsChange = (musicianAssignments: MusicianAssignment[]) => {
    setFormData(prev => ({
      ...prev,
      musicianAssignments
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(formData);
      await createService(formData);
      alert('Servicio guardado exitosamente');
      setFormData({
        serviceDate: '',
        practiceDate: '',
        location: '',
        directorIds: [] as string[],
        musicianAssignments: [] as MusicianAssignment[]
      });
      router.push('/admin/');
    } catch (error) {
      alert('Error al guardar el servicio');
    }
  };

  

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Crear/Editar Servicio</h1>
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Cargando usuarios...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if(error) {
    return (<><div>
      Error: {error}
      </div></>)
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-700">
      
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Crear/Editar Servicio</h1>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
          {/* Fechas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha del Servicio
              </label>
              <input
                type="date"
                name="serviceDate"
                value={formData.serviceDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de ensayo
              </label>
              <input
                type="date"
                name="practiceDate"
                value={formData.practiceDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Sede */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sede
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: Auditorio Principal"
              required
            />
          </div>

          {/* Directores */}
          <div>
            <UsersSelection
              users={users}
              selectedUserIds={formData.directorIds}
              onSelectionChange={handleDirectorsChange}
              placeholder="Selecciona director(es)"
              label="Director(es)"
              multiple={true}
              loading={loading}
              error={error}
              onRetry={() => window.location.reload()}
            />
          </div>

          {/* Músicos */}
          <div>
            <MusiciansSelection
              users={users}
              musiciansList={formData.musicianAssignments}
              onAssignmentsChange={handleMusicianAssignmentsChange}
              availableInstruments={availableInstruments}
              loading={loading}
              error={error}
              onRetry={() => window.location.reload()}
            />
          </div>

          {/* Botones */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Guardar Servicio
            </button>
            <button
              type="button"
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
              onClick={() => router.push('/admin/')}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 