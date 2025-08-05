'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import AdminDashboard from '@/components/AdminDashboard';
import DirectorDashboard from '@/components/DirectorDashboard';
import UserDashboard from '@/components/UserDashboard';

export default function Dashboard() {
  // Simulamos el rol del usuario - en una app real esto vendría del contexto/auth
  const [userRole, setUserRole] = useState<'admin' | 'director' | 'usuario'>('admin');

  const renderDashboardContent = () => {
    switch (userRole) {
      case 'admin':
        return <AdminDashboard />;
      case 'director':
        return <DirectorDashboard />;
      case 'usuario':
        return <UserDashboard />;
      default:
        return <UserDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setUserRole('admin')}
              className={`px-3 py-1 rounded text-sm ${
                userRole === 'admin' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Admin
            </button>
            <button
              onClick={() => setUserRole('director')}
              className={`px-3 py-1 rounded text-sm ${
                userRole === 'director' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Director
            </button>
            <button
              onClick={() => setUserRole('usuario')}
              className={`px-3 py-1 rounded text-sm ${
                userRole === 'usuario' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Usuario
            </button>
          </div>
        </div>
        {renderDashboardContent()}
      </div>
    </div>
  );
} 