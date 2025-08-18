'use client';

import { useState } from 'react';



interface UsersSelectionProps {
  users: User[];
  selectedUserIds: string[];
  onSelectionChange: (userIds: string[]) => void;
  placeholder?: string;
  label?: string;
  multiple?: boolean;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export default function UsersSelection({
  users,
  selectedUserIds,
  onSelectionChange,
  placeholder = "Selecciona usuarios",
  label = "Usuarios",
  multiple = true,
  loading = false,
  error = null,
  onRetry
}: UsersSelectionProps) {

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (multiple) {
      // Para selección múltiple
      const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
      onSelectionChange(selectedOptions);
    } else {
      // Para selección única
      const selectedValue = e.target.value;
      onSelectionChange(selectedValue ? [selectedValue] : []);
    }
  };

  const removeUser = (userId: string) => {
    const updatedSelection = selectedUserIds.filter(id => id !== userId);
    onSelectionChange(updatedSelection);
  };

  const getSelectedUsers = () => {
    return users.filter(user => selectedUserIds.includes(user.id));
  };

  if (loading) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {label}
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
          {label}
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
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      
      <select
        multiple={multiple}
        value={multiple ? selectedUserIds : selectedUserIds[0] || ''}
        onChange={handleSelectChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        size={multiple ? 4 : 1}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {users.map((user) => (
          <option key={user.id} value={user.id} className='text-gray-700 mt-1 border-b border-gray-200 p-1.5'>
            {user.name} 
          </option>
        ))}
      </select>

      {/* Mostrar usuarios seleccionados */}
      {multiple && selectedUserIds.length > 0 && (
        <div className="mt-2">
          <p className="text-sm text-gray-600 mb-2">Usuarios seleccionados:</p>
          <div className="flex flex-wrap gap-2">
            {getSelectedUsers().map((user) => (
              <span
                key={user.id}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-1"
              >
                {user.name}
                <button
                  type="button"
                  onClick={() => removeUser(user.id)}
                  className="text-blue-600 hover:text-blue-800 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Mostrar usuario seleccionado (selección única) */}
      {!multiple && selectedUserIds.length > 0 && (
        <div className="mt-2">
          <p className="text-sm text-gray-600 mb-2">Usuario seleccionado:</p>
          <div className="flex flex-wrap gap-2">
            {getSelectedUsers().map((user) => (
              <span
                key={user.id}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-1"
              >
                {user.name}
                <button
                  type="button"
                  onClick={() => removeUser(user.id)}
                  className="text-blue-600 hover:text-blue-800 font-bold"
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
