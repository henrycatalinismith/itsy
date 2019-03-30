import actions from "../actions"
import select from "../selectors"

export default () => (dispatch, getState) => {
  const action = actions.stop()
  dispatch(action)
}
