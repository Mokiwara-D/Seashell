/*
 * Testing purposes only
*/

export interface Destination {
  id: number
  name: string
}

export const DESTINATIONS: Destination[] = [
  { id: 186, name: 'Balearics' },
  { id: 21, name: 'Bulgaria' },
  { id: 187, name: 'Canaries' },
  { id: 206, name: 'Channel Islands' },
  { id: 84, name: 'Croatia' },
  { id: 48, name: 'Cyprus' },
  { id: 192, name: 'Dominican Republic' },
  { id: 58, name: 'Egypt' },
  { id: 196, name: 'France' },
  { id: 195, name: 'Gambia' },
  { id: 78, name: 'Greece Mainland' },
  { id: 188, name: 'Greek Islands' },
  { id: 193, name: 'Italy' },
  { id: 126, name: 'Malta' },
  { id: 130, name: 'Mexico' },
  { id: 152, name: 'Portugal' },
  { id: 60, name: 'Spain' },
  { id: 172, name: 'Tunisia' },
  { id: 174, name: 'Turkey' },
  { id: 200, name: 'USA' },
]

export const getDestinationById = (id: number): Destination | undefined => {
  return DESTINATIONS.find((dest) => dest.id === id)
}
