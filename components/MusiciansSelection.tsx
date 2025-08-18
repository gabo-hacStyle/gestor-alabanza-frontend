'use client';





interface MusicianAssignment {
  musicianId: string;
  instrument: string;
}

interface MusiciansSelectionProps {
  users: User[];
  musiciansList: MusicianAssignment[];
  onAssignmentsChange: (assignments: MusicianAssignment[]) => void;
  availableInstruments: string[];
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export default function MusiciansSelection({
  users,
  musiciansList,
  onAssignmentsChange,
  availableInstruments,
  loading = false,
  error = null,
  onRetry
}: MusiciansSelectionProps) {

  const handleMusicianChange = (instrument: string, musicianId: string) => {
    const newAssignments = [...musiciansList];
    const existingIndex = newAssignments.findIndex(assignment => assignment.instrument === instrument);
    
    if (existingIndex >= 0) {
      if (musicianId) {
        newAssignments[existingIndex] = { instrument, musicianId };
      } else {
        newAssignments.splice(existingIndex, 1);
      }
    } else if (musicianId) {
      newAssignments.push({ instrument, musicianId });
    }
    
    onAssignmentsChange(newAssignments);
  };

  const removeMusician = (instrument: string) => {
    const newAssignments = musiciansList.filter(assignment => assignment.instrument !== instrument);
    onAssignmentsChange(newAssignments);
  };

  const getMusicianName = (musicianId: string) => {
    const user = users.find(u => u.id === musicianId);
    return user ? user.name : 'Usuario no encontrado';
  };

  if (loading) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Asignar músicos a instrumentos
        </label>
        <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
          <span className="text-gray-500">Cargando usuarios...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Asignar músicos a instrumentos
        </label>  
        <div className="w-full px-3 py-2 border border-red-300 rounded-md bg-red-50">
          <span className="text-red-600">Error: {error}</span>
          {onRetry && (
            <button
              onClick={onRetry}
              className="ml-2 text-blue-600 hover:text-blue-800 underline"
            >
              Reintentar
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Asignar músicos a instrumentos
      </label>
      
      <div className="grid gap-4">
        {availableInstruments.map((instrument) => {
          const currentAssignment = musiciansList.find(assignment => assignment.instrument === instrument);
          const currentMusicianId = currentAssignment?.musicianId || '';
          
          return (
            <div key={instrument} className="flex items-center gap-4 text-gray-700">
              <div className="w-32 font-medium text-gray-700">{instrument}</div>
              <div className="flex-1">
                <select
                  value={currentMusicianId}
                  onChange={(e) => handleMusicianChange(instrument, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecciona músico</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id} className='text-gray-700'>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
              {currentMusicianId && (
                <button
                  type="button"
                  onClick={() => removeMusician(instrument)}
                  className="p-2 text-red-600 hover:text-red-800 transition-colors "
                  title="Remover músico"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Mostrar asignaciones actuales */}
      {musiciansList.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Asignaciones actuales:</p>
          <div className="flex flex-wrap gap-2">
            {musiciansList.map((assignment) => (
              <span
                key={assignment.instrument}
                className="px-3 py-1 bg-green-100 rounded-full text-sm flex items-center gap-1 text-gray-700"
              >
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                {getMusicianName(assignment.musicianId)} - {assignment.instrument}
                <button
                  type="button"
                  onClick={() => removeMusician(assignment.instrument)}
                  className="text-green-600 hover:text-green-800 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
