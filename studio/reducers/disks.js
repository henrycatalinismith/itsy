import {
  reducer,
  insert,
  update,
  remove,
} from "@highvalley.systems/signalbox"

export default reducer({}, {
  updateDisk: (disks, action) => {
    return {
      ...disks,
      [action.disk.id]: {
        ...disks[action.disk.id],
        ...action.disk,
      }
    }
  },

  //createDisk: insert("disk"),
  //deleteDisk: remove("disk"),
})

