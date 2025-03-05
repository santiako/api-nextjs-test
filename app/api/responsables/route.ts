import { NextResponse } from 'next/server'
import { ResponsableService } from '../../../services/responsableService'

// Obtiene todos los responsables
export async function GET() {
  try {
    const responsables = await ResponsableService.getResponsables();
    return NextResponse.json(responsables, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error getting responsables' },
      { status: 500 }
    );
  }
}
