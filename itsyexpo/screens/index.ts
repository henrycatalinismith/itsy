export interface DiskParams {
  id: string
}

export type RootStackParamList = {
  Devtools: DiskParams
  Disk: DiskParams
  Home: undefined
  New: undefined
  Rename: DiskParams
  Delete: DiskParams
}
