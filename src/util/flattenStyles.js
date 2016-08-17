const flattenStyle = (styles) => {
  const out = {}

  const flattenThing = (thing) => {
    if (!thing) return
    if (thing.toString === Object.prototype.toString) {
      Object.assign(out, thing)
      return
    }
    if (thing instanceof Array) {
      thing.forEach(flattenThing)
    }
  }
  flattenThing(styles)
  return out
}

export default flattenStyle
