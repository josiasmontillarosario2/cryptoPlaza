import { type NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/app/i18n/routing';
import { updateSession } from '@/lib/supabase/middleware';

const i18nMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Si es una ruta de API, salta i18n (no redirigir a /en/api) pero ejecuta updateSession para auth
  if (pathname.startsWith('/api')) {
    const response = NextResponse.next({ request });
    return await updateSession(request, response);
  }

  
  // Step 1: Run next-intl middleware to handle locale detection and redirects
  const i18nResponse = i18nMiddleware(request);
  // Step 2: Pass the request and the i18n response to Supabase's updateSession
  return await updateSession(request, i18nResponse);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    // Include root and localized routes for i18n
    '/',
    '/(en|es)/:path*',
  ],
};
