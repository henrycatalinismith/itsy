module.exports = (actionType, handler) => store => next => action => {
  if (action.type.match(actionType)) {
    handler.call(null, store, action)
  }
  return next(action)
}
