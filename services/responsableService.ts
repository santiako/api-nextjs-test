import { Responsable } from '../types/responsable';
import { ResponsableDto } from '../types/responsableDto';
import responsablesData from '../data/responsables.json';

// Clase que contiene los métodos para obtener responsables
export class ResponsableService {

  // Método para obtener los responsables
  static async getResponsables(): Promise<ResponsableDto[]> {
    try {
      const responsables: Responsable[] = responsablesData.data.responsables;

      // Ordenar por IDResponsable
      const orderedResponsables = responsables.sort((a, b) => 
        parseInt(a.IDResponsable) - parseInt(b.IDResponsable)
      );

      return orderedResponsables.map(this.toDto);
    } catch (error) {
      throw new Error('Error al obtener responsables');
    }
  }

  // Método para convertir un responsable a un DTO
  private static toDto(responsable: Responsable): ResponsableDto {
    return {
      id: responsable.IDResponsable,
      name: responsable.Responsable,
      categoryId: responsable.IDCategoria,
      email: responsable.Correo,
      position: responsable.Puesto,
      phone: responsable.Telefono,
      typeId: responsable.IDTipo
    };
  }
} 