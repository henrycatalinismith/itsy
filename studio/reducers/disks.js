import { reducer } from "@highvalley.systems/signalbox"

export default reducer({}, {
  new: (disks, action) => {
    console.log(action.disk)
    return {
      ...disks,
      [action.disk.id]: {
        ...disks[action.disk.id],
        ...action.disk,
      }
    }
  },

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

