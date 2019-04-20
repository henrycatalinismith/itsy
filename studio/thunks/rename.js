import { FileSystem } from "expo"

import actions from "../actions"
import helpers from "../helpers"
import select from "../selectors"

export default name => async (dispatch, getState) => {
  const state = getState()
  const id = select.scalars.from(state).diskId()
  const before = select.disks.from(state).byId(id)
  const after = { id, name }
  const action = actions.rename(after)

  const oldName = helpers.filename(before)
  const newName = helpers.filename(after)

  const { exists } = await FileSystem.getInfoAsync(oldName)
  if (exists) {
    await FileSystem.moveAsync({
      from: oldName,
      to: newName,
    })
  }

  dispatch(action)
}
