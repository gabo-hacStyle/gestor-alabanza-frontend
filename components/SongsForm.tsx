'use client';


interface CreateSongBody {
  songName: string;
  composer: string;
  link: string;
  tonality: string;
}

interface SongsFormProps {
  songs: CreateSongBody[];
  onSongsChange: (songs: CreateSongBody[]) => void;
  loading?: boolean;
  error?: string | null;
}

export default function SongsForm({
  songs,
  onSongsChange,
  loading = false,
  error = null
}: SongsFormProps) {

  const tonalityOptions = [
    { value: 'original', label: 'Original' },
    { value: '+1/2', label: '+ 1/2' },
    { value: '+1', label: '+ 1' },
    { value: '+2', label: '+ 2' },
    { value: '-1/2', label: '- 1/2' },
    { value: '-1', label: '- 1' },
    { value: '-2', label: '- 2' }
  ];

  const addSong = () => {
    const newSong: CreateSongBody = {
      songName: '',
      composer: '',
      link: '',
      tonality: 'original'
    };
    onSongsChange([...songs, newSong]);
  };

  const removeSong = (index: number) => {
    const newSongs = songs.filter((_, i) => i !== index);
    onSongsChange(newSongs);
  };

  const updateSong = (index: number, field: keyof CreateSongBody, value: string) => {
    const newSongs = [...songs];
    newSongs[index] = {
      ...newSongs[index],
      [field]: value
    };
    onSongsChange(newSongs);
  };

  const moveSong = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === songs.length - 1) return;

    const newSongs = [...songs];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    [newSongs[index], newSongs[newIndex]] = [newSongs[newIndex], newSongs[index]];
    onSongsChange(newSongs);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Lista de Canciones</h3>
        </div>
        <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
          <span className="text-gray-500">Cargando canciones...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Lista de Canciones</h3>
        </div>
        <div className="w-full px-3 py-2 border border-red-300 rounded-md bg-red-50">
          <span className="text-red-600">Error: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Lista de Canciones ({songs.length})
        </h3>
        <button
          type="button"
          onClick={addSong}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Agregar Canción
        </button>
      </div>

      {songs.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
          <p className="text-gray-600">No hay canciones agregadas</p>
        </div>
      ) : (
        <div className="space-y-4">
          {songs.map((song, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-md font-medium text-gray-900">
                  Canción #{index + 1}
                </h4>
                <div className="flex gap-2">
                  {/* Botones de orden */}
                  <button
                    type="button"
                    onClick={() => moveSong(index, 'up')}
                    disabled={index === 0}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:text-gray-200 disabled:cursor-not-allowed"
                    title="Mover arriba"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => moveSong(index, 'down')}
                    disabled={index === songs.length - 1}
                    className="p-1 text-gray-400 hover:text-gray-600 disabled:text-gray-200 disabled:cursor-not-allowed"
                    title="Mover abajo"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {/* Botón eliminar */}
                  <button
                    type="button"
                    onClick={() => removeSong(index)}
                    className="p-1 text-red-400 hover:text-red-600 transition-colors"
                    title="Eliminar canción"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nombre de la canción */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre de la Canción *
                  </label>
                  <input
                    type="text"
                    value={song.songName}
                    onChange={(e) => updateSong(index, 'songName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ej: Agnus Dei"
                    required
                  />
                </div>

                {/* Compositor */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Compositor *
                  </label>
                  <input
                    type="text"
                    value={song.composer}
                    onChange={(e) => updateSong(index, 'composer', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ej: Su Presencia"
                    required
                  />
                </div>

                {/* Link */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Link (YouTube/Spotify)
                  </label>
                  <input
                    type="url"
                    value={song.link}
                    onChange={(e) => updateSong(index, 'link', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>

                {/* Tonalidad */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tonalidad
                  </label>
                  <select
                    value={song.tonality}
                    onChange={(e) => updateSong(index, 'tonality', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {tonalityOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
