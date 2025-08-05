'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';

export default function AdminServidores() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    rol: '',
    especialidad: '',
    disponibilidad: '',
    notas: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos del servidor:', formData);
    // Aquí se enviarían los datos al backend
    alert('Servidor guardado exitosamente');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Gestionar Servidores</h1>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre Completo
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rol Principal
              </label>
              <select
                name="rol"
                value={formData.rol}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Seleccionar rol</option>
                <option value="musico">Músico</option>
                <option value="lector">Lector</option>
                <option value="usher">Usher</option>
                <option value="tecnico">Técnico</option>
                <option value="coordinador">Coordinador</option>
                <option value="orador">Orador</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Especialidad
              </label>
              <input
                type="text"
                name="especialidad"
                value={formData.especialidad}
                onChange={handleInputChange}
                placeholder="Ej: Guitarra, Piano, Audio, etc."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Disponibilidad
              </label>
              <select
                name="disponibilidad"
                value={formData.disponibilidad}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar disponibilidad</option>
                <option value="domingos">Solo Domingos</option>
                <option value="domingos-oracion">Domingos y Oración</option>
                <option value="todos">Todos los Servicios</option>
                <option value="especiales">Solo Servicios Especiales</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notas Adicionales
            </label>
            <textarea
              name="notas"
              value={formData.notas}
              onChange={handleInputChange}
              rows={3}
              placeholder="Información adicional sobre el servidor..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Guardar Servidor
            </button>
            <button
              type="button"
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
            >
              Cancelar
            </button>
          </div>
        </form>

        {/* Lista de servidores existentes */}
        <div className="mt-8 bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Servidores Registrados</h2>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">Juan Pérez</h3>
                <p className="text-sm text-gray-600">Músico • Guitarra</p>
                <p className="text-sm text-blue-600">Disponible: Domingos y Oración</p>
              </div>
              <div className="text-right">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  Activo
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">María García</h3>
                <p className="text-sm text-gray-600">Lector • Coordinadora</p>
                <p className="text-sm text-blue-600">Disponible: Todos los Servicios</p>
              </div>
              <div className="text-right">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  Activo
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">Carlos López</h3>
                <p className="text-sm text-gray-600">Técnico • Audio</p>
                <p className="text-sm text-blue-600">Disponible: Domingos</p>
              </div>
              <div className="text-right">
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                  Limitado
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 