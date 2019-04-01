import actions from "../actions"
import select from "../selectors"

export default () => (dispatch, getState) => {
  const state = getState()

  const diskId = select.scalars.from(state).diskId()
  const disk = select.disks.from(state).byId(diskId)
  const edit = select.edits.from(state).running(diskId)

  const action = actions.stop()

  action.edit = {
    id: edit.id,
    stopped: (new Date).toISOString(),
  }

  dispatch(action)
}
