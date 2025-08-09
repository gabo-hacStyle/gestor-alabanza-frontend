import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get('auth_token');
  const userInfo = request.cookies.get('user_info');

  // Rutas públicas que no requieren autenticación
  const publicRoutes = ['/login', '/', '/api/auth'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // Si no hay token y no es una ruta pública, redirigir a login
  if (!authToken && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Si hay token y está en login, redirigir al dashboard apropiado
  if (authToken && pathname === '/login') {
    try {
      const user = userInfo ? JSON.parse(userInfo.value) : null;
      
      if (user) {
        // Redirigir según el rol del usuario
        switch (user.role) {
          case 'ADMIN':
            return NextResponse.redirect(new URL('/admin', request.url));
          case 'DIRECTOR':
            return NextResponse.redirect(new URL('/director', request.url));
          case 'MUSICIAN':
            return NextResponse.redirect(new URL('/dashboard', request.url));
          default:
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
      }
    } catch (error) {
      console.error('Error parsing user info:', error);
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Proteger rutas específicas según el rol
  if (authToken && userInfo) {
    try {
      const user = JSON.parse(userInfo.value);
      
      // Rutas que requieren rol ADMIN
      if (pathname.startsWith('/admin') && user.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
      
      // Rutas que requieren rol DIRECTOR
      if (pathname.startsWith('/director') && user.role !== 'DIRECTOR' && user.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    } catch (error) {
      console.error('Error parsing user info in middleware:', error);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
