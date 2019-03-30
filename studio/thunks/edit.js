import actions from "../actions"
import select from "../selectors"

export default lua => (dispatch, getState) => {
  const state = getState()
  const diskId = select.scalars.from(state).diskId()

  const action = actions.edit({
    lua,
    id: diskId,
  })

  console.log(action)
  dispatch(action)
}
