export const getElementWidth = (element) => {
  if (!element) return 0

  return Math.round(element.getBoundingClientRect().width)
}
