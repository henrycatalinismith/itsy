export interface Disk {
  id: string
  name: string
  lua: string
  palette: string
  snapshot: string
  spritesheet: string
  active: boolean
  created: string
  updated: string
}

export interface PartialDisk {
  id?: string
  name?: string
  lua?: string
  palette?: string
  snapshot?: string
  spritesheet?: string
  active?: boolean
  created?: string
  updated?: string
}

export interface Point2D {
  x: number
  y: number
}
