import * as FileSystem from "expo-file-system"

export default (disk) => {
  const root = FileSystem.documentDirectory
  const base = disk.name.replace(/[^a-z0-9]/gi, "-")
  const name = `${root}${base}.html`
  return name
}
