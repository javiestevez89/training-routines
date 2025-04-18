import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { Database } from '@/types/database'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })

  // Get the user_email cookie
  const userEmail = req.cookies.get('user_email')?.value

  // If we have a user_email cookie, treat it as an authenticated session
  const isAuthenticated = !!userEmail

  // If not authenticated and the current path is not / or /onboarding, redirect to /
  if (!isAuthenticated && !['/onboarding', '/'].includes(req.nextUrl.pathname)) {
    console.log('No authentication found, redirecting to homepage')
    return NextResponse.redirect(new URL('/', req.url))
  }

  // If authenticated and on homepage, redirect to dashboard
  if (isAuthenticated && req.nextUrl.pathname === '/') {
    console.log('User authenticated, redirecting to dashboard')
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/onboarding/:path*'],
}
