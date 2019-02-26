module.exports = (initialState, actions) => (state, action) => {
  switch (true) {
    case state === undefined:
      return initialState
    case actions.hasOwnProperty(action.type):
      return actions[action.type](state, action)
    default:
      return state
  }
}
