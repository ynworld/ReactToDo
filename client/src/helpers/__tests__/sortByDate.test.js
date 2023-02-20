const { sortByDate } = require('../sortByDate')

test('expect to get 1, first date is smaller', () => {
  expect(
    sortByDate(
      { createdAt: '2022-12-11T00:00:00.000Z' },
      { createdAt: '2022-12-12T00:00:00.000Z' },
    ),
  ).toBe(1)
})

test('expect to get -1, first date is larger', () => {
  expect(
    sortByDate(
      { createdAt: '2022-12-13T00:00:00.000Z' },
      { createdAt: '2022-12-11T00:00:00.000Z' },
    ),
  ).toBe(-1)
})

test('expect to get 0, dates are the same', () => {
  expect(
    sortByDate(
      { createdAt: '2022-12-11T00:00:00.000Z' },
      { createdAt: '2022-12-11T00:00:00.000Z' },
    ),
  ).toBe(0)
})
