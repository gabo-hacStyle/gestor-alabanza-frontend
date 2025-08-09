'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUserInfo, logout } from '@/service/backend/auth';
import { User } from '@/types/auth';

export default function UserHeader() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        setUser(userInfo);
      } catch (error) {
        console.error('Error cargando información del usuario:', error);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    loadUserInfo();
  }, [router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Error en logout:', error);
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'Administrador';
      case 'DIRECTOR':
        return 'Director';
      case 'MUSICIAN':
        return 'Músico';
      default:
        return role;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-between p-4 bg-white shadow-sm">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-sm">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">
            {user.name || 'Usuario'}
          </p>
          <p className="text-xs text-gray-500">
            {user.email} • {getRoleDisplayName(user.role)}
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={handleLogout}
          className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1 rounded-md hover:bg-gray-100 transition-colors"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
