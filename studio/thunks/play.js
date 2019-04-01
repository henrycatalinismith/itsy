import actions from "../actions"
import select from "../selectors"

export default () => (dispatch, getState) => {
  const state = getState()
  const diskId = select.scalars.from(state).diskId()
  const disk = select.disks.from(state).byId(diskId)
  const edit = select.edits.from(state).latest(diskId)

  const action = actions.play(disk)

  action.edit = {
    id: edit.id,
    started: (new Date).toISOString(),
    stopped: undefined,
  }

  dispatch(action)
}
