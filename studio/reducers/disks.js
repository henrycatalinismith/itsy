import { reducer } from "@highvalley.systems/signalbox"

export default reducer({}, {
  edit: (disks, action) => {
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

