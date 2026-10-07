export const PROVINCIAS_PERMITIDAS = ['Murcia', 'Castellón', 'Valencia'] as const;

export type ProvinciaType = (typeof PROVINCIAS_PERMITIDAS)[number];
