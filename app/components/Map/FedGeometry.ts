import { Party } from '../Party/Party'

export type FedGeometryProperties = {
  FED_ID: number
  Name: string
  Winner: Party
  centroid: [number, number]
} & Record<Partial<Party>, number>

export type FedGeometry = {
  type: 'Feature'
  geometry: {
    type: 'Polygon'
    coordinates: number[][][]
  }
  properties: FedGeometryProperties
}
