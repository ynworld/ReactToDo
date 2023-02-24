import { getElementWidth } from '../element'

it('returns correctly rounded width, or 0 for no element', () => {
  const myElement = document.createElement('div')
  const myElement2 = document.createElement('div')
  const myElement3 = null

  myElement.getBoundingClientRect = jest.fn(() => {
    return {
      width: 120.3,
    }
  })
  myElement2.getBoundingClientRect = jest.fn(() => {
    return {
      width: 245.7,
    }
  })
  expect(getElementWidth(myElement)).toEqual(120)
  expect(getElementWidth(myElement2)).toEqual(246)
  expect(getElementWidth(myElement3)).toEqual(0)
})
