import uuid from "uuid"

import actions from "../actions"
import { palette, snapshot, spritesheet } from "../defaults"
import select from "../selectors"
import words from "../words"

export default () => (dispatch, getState) => {
  const state = getState()

  const action = actions.new()

  action.disk = {
    id: uuid(),
    name: words(),
    created: (new Date).toISOString(),
    updated: (new Date).toISOString(),
  }

  action.edit = {
    id: uuid(),
    diskId: action.disk.id,
    lua: "",
    palette,
    snapshot,
    spritesheet,
    created: action.disk.created,
    updated: action.disk.updated,
    started: undefined,
    stopped: undefined,
  }

  dispatch(action)
}
