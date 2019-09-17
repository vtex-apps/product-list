import { WITHOUT_STOCK } from '../constants/Availability'

export const opaque = (availability: string) =>
  availability === WITHOUT_STOCK ? 'o-70' : ''
