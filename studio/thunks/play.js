import { FileSystem } from "expo"
import itsy from "@highvalley.systems/itsy"

import actions from "../actions"
import select from "../selectors"

export default () => (dispatch, getState) => {
  const state = getState()
  const diskId = select.scalars.from(state).diskId()
  const disk = select.disks.from(state).byId(diskId)
  const edit = select.edits.from(state).latest(diskId)

  const html = itsy.build(edit.lua)
  const action = actions.play(disk)

  action.edit = {
    id: edit.id,
    html,
    started: (new Date).toISOString(),
    stopped: undefined,
  }

  const uri = `${FileSystem.documentDirectory}${disk.name}.html`
  FileSystem.writeAsStringAsync(uri, html).then(() => {
    console.log("saved disk")
  }).catch(e => {
    console.error(e)
  })

  dispatch(action)
}
