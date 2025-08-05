'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';

export default function DirectorRepertorio() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const canciones = [
    {
      id: 1,
      titulo: 'Alabaré a mi Señor',
      artista: 'Hillsong',
      genero: 'Alabanza',
      tono: 'C',
      estado: 'Activa'
    },
    {
      id: 2,
      titulo: 'Santo Santo Santo',
      artista: 'Tradicional',
      genero: 'Adoración',
      tono: 'G',
      estado: 'Activa'
    },
    {
      id: 3,
      titulo: 'Grande es tu fidelidad',
      artista: 'Chris Tomlin',
      genero: 'Adoración',
      tono: 'D',
      estado: 'Activa'
    },
    {
      id: 4,
      titulo: 'Te exaltamos',
      artista: 'Hillsong',
      genero: 'Alabanza',
      tono: 'A',
      estado: 'Inactiva'
    },
    {
      id: 5,
      titulo: 'Amazing Grace',
      artista: 'Tradicional',
      genero: 'Testimonio',
      tono: 'F',
      estado: 'Activa'
    }
  ];

  const filteredCanciones = canciones.filter(cancion => {
    const matchesSearch = cancion.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cancion.artista.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = !selectedGenre || cancion.genero === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const handleEditSong = (id: number) => {
    console.log('Editar canción:', id);
    // Aquí se abriría el formulario de edición
    alert(`Editando canción ${id}`);
  };

  const handleToggleStatus = (id: number) => {
    console.log('Cambiar estado de canción:', id);
    // Aquí se cambiaría el estado de la canción
    alert(`Cambiando estado de canción ${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Gestionar Repertorio</h1>
        
        {/* Filtros */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Buscar Canción
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por título o artista..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filtrar por Género
              </label>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todos los géneros</option>
                <option value="Alabanza">Alabanza</option>
                <option value="Adoración">Adoración</option>
                <option value="Testimonio">Testimonio</option>
                <option value="Oración">Oración</option>
                <option value="Evangélico">Evangélico</option>
              </select>
            </div>
          </div>
        </div>

        {/* Lista de canciones */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">
              Repertorio ({filteredCanciones.length} canciones)
            </h2>
          </div>
          
          <div className="divide-y">
            {filteredCanciones.map((cancion) => (
              <div key={cancion.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium text-gray-900">{cancion.titulo}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        cancion.estado === 'Activa' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {cancion.estado}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {cancion.artista} • {cancion.genero} • Tono: {cancion.tono}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditSong(cancion.id)}
                      className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleToggleStatus(cancion.id)}
                      className={`px-3 py-1 text-sm rounded ${
                        cancion.estado === 'Activa'
                          ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                          : 'bg-green-500 text-white hover:bg-green-600'
                      }`}
                    >
                      {cancion.estado === 'Activa' ? 'Desactivar' : 'Activar'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Estadísticas */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-600">Total Canciones</h3>
            <p className="text-2xl font-bold text-gray-900">{canciones.length}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-600">Activas</h3>
            <p className="text-2xl font-bold text-green-600">
              {canciones.filter(c => c.estado === 'Activa').length}
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-600">Alabanza</h3>
            <p className="text-2xl font-bold text-blue-600">
              {canciones.filter(c => c.genero === 'Alabanza').length}
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-600">Adoración</h3>
            <p className="text-2xl font-bold text-purple-600">
              {canciones.filter(c => c.genero === 'Adoración').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 