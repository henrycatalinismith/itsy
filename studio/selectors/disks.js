const asc = (a, b) => a.updated < b.updated ? -1 : a.updated > b.updated ? 1 : 0
const desc = (a, b) => a.updated > b.updated ? -1 : a.updated < b.updated ? 1 : 0

export default {
  all: disks => Object.values(disks),
  byId: (disks, id) => disks[id],

  forHomeScreen: disks => Object
    .values(disks)
    .sort(desc),
}


