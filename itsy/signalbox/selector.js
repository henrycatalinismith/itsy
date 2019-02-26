module.exports = (entity, selectors) => ({
  from: (store) => new Proxy({}, {
    get: (target, name) => {
      return selectors[name].bind(null, (store.getState())[entity])
    }
  })
})
