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
    const { lua, palette, spritesheet } = itsy.read(html)

    const newDisk = {
      id: uuid(),
      name: "--from disk--",
      created: (new Date).toISOString(),
      updated: (new Date).toISOString(),
    }

    diskList.push(newDisk)

    editList.push({
      id: uuid(),
      diskId: newDisk.id,
      html: html,
      lua,
      palette,
      snapshot: undefined,
      spritesheet,
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
