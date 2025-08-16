'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">Asignacion de servicios</h1>
          </div>
          
          <div className="flex space-x-4">
            <Link
              href="/dashboard"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === '/dashboard'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/servicios"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === '/servicios'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Todos los Servicios
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 