import actions from "../actions"
import select from "../selectors"

export default lua => (dispatch, getState) => {
  const state = getState()
  const diskId = select.scalars.from(state).diskId()
  const edit = select.edits.from(state).byDiskId(diskId).pop()

  const action = actions.edit({
    lua,
    id: diskId,
  })

  action.edit = {
    id: edit.id,
    lua,
  }

  console.log(action)
  dispatch(action)
}
