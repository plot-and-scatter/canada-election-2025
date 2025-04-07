import { Party } from '../Party/Party'
import { PartyColors } from '../Party/PartyColors'

export function rgbaToRgbaArray(
  rgb: string,
  opacity?: number,
): [number, number, number, number] {
  const rgba = rgb.split('rgb(')[1].split(')')[0].split(',')
  return [
    parseInt(rgba[0]),
    parseInt(rgba[1]),
    parseInt(rgba[2]),
    opacity === undefined ? parseInt(rgba[3]) : opacity,
  ]
}

export function getPartyColor(
  party: Party,
  opacity?: number,
): [number, number, number, number] {
  const partyColor = PartyColors[party]
  return partyColor ? rgbaToRgbaArray(partyColor, opacity) : [0, 0, 0, 0]
}
