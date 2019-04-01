import {
  reducer,
  insert,
  merge,
  remove,
} from "@highvalley.systems/signalbox"

const update = entityName => (entityState, action) => ({
  ...entityState,
  [action[entityName].id]: {
    ...entityState[action[entityName].id],
    ...action[entityName],
  },
})

export default reducer({}, {
  edit: update("edit"),
  play: update("edit"),
  stop: update("edit"),
})

