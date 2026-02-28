'use client';
interface MusicianAssignment {
  musicianIds: string[];
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

  const handleMusicianChange = (instrument: string, selectedMusicianIds: string[]) => {
    // Build new assignments: keep all non-related instruments, then add this instrument with all selected musicians
    const newAssignments = musiciansList.filter(a => a.instrument !== instrument);

    if (selectedMusicianIds.length > 0) {
      newAssignments.push({ instrument, musicianIds: selectedMusicianIds });
    }
    
    onAssignmentsChange(newAssignments);
  };

  const removeMusician = (instrument: string, musicianIdToRemove?: string) => {
    const newAssignments = musiciansList.map(assignment => {
      if (assignment.instrument !== instrument) return assignment;
      
      if (musicianIdToRemove) {
        // Remove specific musician from this instrument
        const filtered = assignment.musicianIds.filter(id => id !== musicianIdToRemove);
        return filtered.length > 0 ? { ...assignment, musicianIds: filtered } : null;
      }
      // Remove entire instrument assignment
      return null;
    }).filter(Boolean) as MusicianAssignment[];
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
          const assignment = musiciansList.find(a => a.instrument === instrument);
          const currentMusicianIds = assignment?.musicianIds || [];

          return (
            <div key={instrument} className="flex items-center gap-4 text-gray-700">
              <div className="w-32 font-medium text-gray-700">{instrument}</div>
              <div className="flex-1">
                {/* custom multiselect using checkboxes for better UX */}
                <div className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <div className="max-h-40 overflow-y-auto">
                    {users.map((user) => {
                      const checked = currentMusicianIds.includes(user.id);
                      return (
                        <label
                          key={user.id}
                          className="flex items-center space-x-2 py-1 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            checked={checked}
                            onChange={(e) => {
                              let nextIds = [...currentMusicianIds];
                              if (e.target.checked) {
                                nextIds.push(user.id);
                              } else {
                                nextIds = nextIds.filter(id => id !== user.id);
                              }
                              handleMusicianChange(instrument, nextIds);
                            }}
                          />
                          <span className="text-gray-700">{user.name}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
              {currentMusicianIds.length > 0 && (
                <button
                  type="button"
                  onClick={() => removeMusician(instrument)}
                  className="p-2 text-red-600 hover:text-red-800 transition-colors "
                  title="Remover todos los músicos del instrumento"
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
            {musiciansList.map((assignment) =>
              assignment.musicianIds.map((musicianId, idx) => (
                <span
                  key={`${assignment.instrument}-${musicianId}-${idx}`}
                  className="px-3 py-1 bg-green-100 rounded-full text-sm flex items-center gap-1 text-gray-700"
                >
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  {getMusicianName(musicianId)} - {assignment.instrument}
                  <button
                    type="button"
                    onClick={() => removeMusician(assignment.instrument, musicianId)}
                    className="text-green-600 hover:text-green-800 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
