'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getServiceByIdAndGetAssignments } from '@/service/backend/service';
import UsersSelection from '@/components/UsersSelection';
import MusiciansSelection from '@/components/MusiciansSelection';
import { geAlltUsers } from '@/service/backend/users';
import { availableInstruments } from '@/data';
import { updateServiceAssignments } from '@/service/backend/admin';
import { useRouter } from 'next/navigation';

export default function AdminServidores() {
  const router = useRouter();
  const { id } = useParams(); 
  const serviceId = id as string;
  console.log('ID del servidor:', id);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [oldAssignments, setOldAssignments] = useState<Assignment>({
    directorIds: [],
    musiciansList: []
  });
  const [newAssignments, setNewAssignments] = useState<Assignment>({
    directorIds: [],
    musiciansList: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch paralelo de usuarios y servicio
        const [usersData, serviceData] = await Promise.all([
          geAlltUsers(),
          getServiceByIdAndGetAssignments(serviceId)
        ]);
        
        setUsers(usersData);
        
        // Inicializar oldAssignments con datos del servicio actual
        const directorIds = serviceData.directorIds || [];
        const musiciansList = serviceData.musiciansList || [] as MusicianAssignment[];
        
        const currentAssignments: Assignment = {
          directorIds: directorIds,
          musiciansList
        };
        
        setOldAssignments(currentAssignments);
        setNewAssignments(currentAssignments); // Inicialmente deberian ser iguales
        
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    if (serviceId) {
      fetchData();
    }
  }, [serviceId]);
  
  console.log('Old assignments:', oldAssignments);
  console.log('New assignments:', newAssignments);

  const handleDirectorsChange = (directorIds: string[]) => {
    setNewAssignments(prev => ({
      ...prev,
      directorIds
    }));
  };

  const handleMusiciansListChange = (musiciansList: MusicianAssignment[]) => {
    setNewAssignments(prev => ({
      ...prev,
      musiciansList
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const updateRequest: UpdateAssignment = {
      oldAssignments,
      newAssignments
    };
    
    console.log('Datos del servidor:', updateRequest);

    await updateServiceAssignments(serviceId, updateRequest);
    alert('Servidor guardado exitosamente');
    router.push('/servicios');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Gestionar Servidores</h1>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
          <div>
            <UsersSelection
              users={users}
              selectedUserIds={newAssignments.directorIds}
              onSelectionChange={handleDirectorsChange}
              placeholder="Selecciona director(es)"
              label="Director(es)"
              multiple={true}
              loading={loading}
              error={error}
              onRetry={() => window.location.reload()}
            />
          </div>
            
          </div>

          {/* Asignación de músicos a instrumentos */}
          <div className="mt-6">
             {/* Músicos */}
          <div>
            <MusiciansSelection
              users={users}
              musiciansList={newAssignments.musiciansList}
              onAssignmentsChange={handleMusiciansListChange}
              availableInstruments={availableInstruments}
              loading={loading}
              error={error}
              onRetry={() => window.location.reload()}
            />
          </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Guardar Servidores
            </button>
            <button
              type="button"
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
              onClick={() => router.push(`/servicios`)}  
             >
              Cancelar
            </button>
          </div>
        </form>

       
      </div>
    </div>
  );
} 