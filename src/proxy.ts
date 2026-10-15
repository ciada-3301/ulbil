import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isMaintenanceActive } from '@/config/maintenance';

export function proxy(request: NextRequest) {
  // If maintenance mode is not active, proceed normally
  if (!isMaintenanceActive()) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  // Block all API routes or state-modifying requests (POST, PUT, DELETE, PATCH) with 503 Service Unavailable
  if (pathname.startsWith('/api') || (request.method !== 'GET' && request.method !== 'HEAD')) {
    return NextResponse.json(
      {
        status: 503,
        error: 'Service Unavailable',
        message: 'This site is currently undergoing scheduled maintenance. Please check back later.',
      },
      {
        status: 503,
        headers: {
          'Retry-After': '3600',
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  }

  // For page requests, proceed with maintenance response headers
  const response = NextResponse.next();
  response.headers.set('X-Maintenance-Mode', 'active');
  response.headers.set('Retry-After', '3600');
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - images, files (public static assets)
     * - favicon.ico, icon.jpg, robots.txt, sitemap.xml
     */
    '/((?!_next/static|_next/image|images|files|favicon.ico|icon.jpg|robots.txt|sitemap.xml).*)',
  ],
};
