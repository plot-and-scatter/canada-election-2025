import { Party } from '../Map/Map'

export const PartyColors: Record<Party, string> = {
  CON: 'rgb(40, 71, 124)',
  LIB: 'rgb(197, 51, 43)',
  NDP: 'rgb(235, 157, 65)',
  GRN: 'rgb(87, 153, 67)',
  BLQ: 'rgb(97, 151, 214)',
  PPC: 'rgb(64, 46, 119)',
  OTH: 'rgb(150, 150, 150)',
  REJ: 'rgb(255, 255, 255)',
} as const
