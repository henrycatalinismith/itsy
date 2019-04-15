import { FileSystem } from "expo"
import _ from "lodash"
import itsy from "@highvalley.systems/itsy"
import uuid from "uuid"

import actions from "../actions"
import select from "../selectors"

export default () => async (dispatch, getState) => {
  const dir = FileSystem.documentDirectory
  const list = await FileSystem.readDirectoryAsync(dir)

  const diskNames = list.filter(name => name.match(/\.html$/))
  const diskList = []
  const editList = []

  for (const name of diskNames) {
    const uri = `${dir}${name}`
    const html = await FileSystem.readAsStringAsync(uri)
    const disk = itsy.read(html)

    const newDisk = {
      id: disk.id,
      name: disk.name,
      created: disk.created,
      updated: disk.updated,
    }

    diskList.push(newDisk)

    editList.push({
      id: uuid(),
      diskId: disk.id,
      html: html,
      lua: disk.lua,
      palette: disk.palette,
      snapshot: disk.snapshot,
      spritesheet: disk.spritesheet,
      created: (new Date).toISOString(),
      updated: (new Date).toISOString(),
      started: undefined,
      stopped: undefined,
    })
  }

  const disks = _.keyBy(diskList, "id")
  const edits = _.keyBy(editList, "id")
  const action = actions.startup(disks, edits)

  dispatch(action)
}
