import {
  reducer,
  insert,
  update,
  remove,
} from "@highvalley.systems/signalbox"

export default reducer({}, {
  createDisk: insert("disk"),
  updateDisk: update("disk"),
  deleteDisk: remove("disk"),
})

