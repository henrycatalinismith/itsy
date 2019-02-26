module.exports = (actionType, handler) => store => next => action => {
  const result = next(action)
  if (action.type.match(actionType)) {
    handler.call(null, store, action)
  }
  return result
}
