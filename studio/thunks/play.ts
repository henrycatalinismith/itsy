import * as FileSystem from "expo-file-system"
import itsy from "@highvalley.systems/itsy"

import actions from "../actions"
import helpers from "../helpers"
import select from "../selectors"

export default () => (dispatch, getState) => {
  const state = getState()
  const diskId = select.scalars.from(state).diskId()
  const disk = select.disks.from(state).byId(diskId)
  const edit = select.edits.from(state).latest(diskId)

  const html = itsy.write({
    id: disk.id,
    name: disk.name,
    created: disk.created,
    updated: disk.updated,
    lua: edit.lua,
    palette: edit.palette,
    snapshot: edit.snapshot,
    spritesheet: edit.spritesheet,
  })

  const action = actions.play(disk)

  action.edit = {
    id: edit.id,
    html,
    started: (new Date).toISOString(),
    stopped: undefined,
  }

  const uri = helpers.filename(disk)
  FileSystem.writeAsStringAsync(uri, html).then(() => {
    console.log("saved disk")
  }).catch(e => {
    console.error(e)
  })

  dispatch(action)
}
