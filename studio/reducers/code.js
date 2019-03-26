import {
  reducer,
  update,
} from "@highvalley.systems/signalbox"

export default reducer({}, {
  selectDisk: (code, action) => {
    return {
      ...code,
      disk: action.disk,
    }
  },
})

