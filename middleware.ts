import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Crear respuesta base
  const response = NextResponse.next()

  // Agregar headers CORS
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Access-Control-Allow-Credentials', 'true')

  // Si es una petición OPTIONS (preflight), retornar 200
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 200, headers: response.headers })
  }

  // Solo aplicar autenticación a rutas que empiecen con /api
  if (request.nextUrl.pathname.startsWith('/api')) {
    const authHeader = request.headers.get('Authorization')
    const API_KEY = process.env.API_KEY

    if (!authHeader || !API_KEY || authHeader !== `Basic ${API_KEY}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
  }

  return response
}

// Configurar en qué rutas se ejecutara el middleware
export const config = {
  matcher: '/api/:path*'
} 
