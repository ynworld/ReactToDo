export const move = (array, from, to, { inPlace = false } = {}) => {
  const ary = inPlace ? array : [...array]

  ary.splice(to, 0, ary.splice(from, 1)[0])

  return ary
}
