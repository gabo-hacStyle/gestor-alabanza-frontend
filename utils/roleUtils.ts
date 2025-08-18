export type UserRole = 'ADMIN' | 'DIRECTOR' | 'MUSICIAN';

export interface User {
  id: string;
  email: string;
  name?: string;
  phoneNumber?: string;
  roles: UserRole[];
  createdAt: string;
}

/**
 * Verifica si un usuario tiene un rol específico
 */
export function hasRole(user: User | null, role: UserRole): boolean {
  if (!user || !user.roles) {
    return false;
  }
  return user.roles.includes(role);
}

/**
 * Verifica si un usuario tiene al menos uno de los roles especificados
 */
export function hasAnyRole(user: User | null, roles: UserRole[]): boolean {
  if (!user || !user.roles) {
    return false;
  }
  return roles.some(role => user.roles.includes(role));
}

/**
 * Verifica si un usuario tiene todos los roles especificados
 */
export function hasAllRoles(user: User | null, roles: UserRole[]): boolean {
  if (!user || !user.roles) {
    return false;
  }
  return roles.every(role => user.roles.includes(role));
}

/**
 * Obtiene el rol principal del usuario (prioridad: ADMIN > DIRECTOR > MUSICIAN)
 */
export function getPrimaryRole(user: User | null): UserRole | null {
  if (!user || !user.roles || user.roles.length === 0) {
    return null;
  }
  
  if (user.roles.includes('ADMIN')) {
    return 'ADMIN';
  }
  if (user.roles.includes('DIRECTOR')) {
    return 'DIRECTOR';
  }
  if (user.roles.includes('MUSICIAN')) {
    return 'MUSICIAN';
  }
  
  return null;
}
