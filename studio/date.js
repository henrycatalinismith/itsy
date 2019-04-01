const times = []

times.push(new Date("2015-01-01"))
times.push(new Date("1885-01-01"))
times.push(new Date("1985-01-01"))

console.log(times)

/*
times.sort((a, b) => { switch (true) {
  case a > b: return 1
  case a < b: return -1
  default:    return 0
}})
*/

console.log(times.sort((a, b) => a > b ? 1 : a < b ? -1 : 0))

console.log(times)
