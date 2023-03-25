const createdAt = Date.now()

const todoItems = [
  {
    createdAt: '2022-12-11T00:00:00.000Z',
    id: 1,
    isChecked: false,
    isImportant: false,
    text: 'Dentist Appointment - Prepare the files and do the necessary tests suggested beforehand.',
  },
  {
    createdAt: '2022-12-15T00:00:00.000Z',
    id: 2,
    isChecked: false,
    isImportant: false,
    text: 'CS-121 Assignment Deadline on Monday',
  },
  {
    createdAt: '2022-12-17T00:00:00.000Z',
    id: 3,
    isChecked: false,
    isImportant: false,
    text: 'Get the electric bulb repaired',
  },
  {
    createdAt: '2022-12-18T00:00:00.000Z',
    id: 4,
    isChecked: true,
    isImportant: false,
    text: 'Soccer Club Meeting @ Sunday',
  },
  {
    createdAt: '2022-12-19T00:00:00.000Z',
    id: 5,
    isChecked: true,
    isImportant: false,
    text: "Buy Gift for Dad's Birthday",
  },
  {
    createdAt: '2022-12-20T00:00:00.000Z',
    id: 6,
    isChecked: true,
    isImportant: false,
    text: 'Submit Assignment on Friday',
  },
  {
    createdAt: '2022-12-21T00:00:00.000Z',
    id: 7,
    isChecked: true,
    isImportant: false,
    text: 'Bring Groceries From Supermarket',
  },
]

const dateModifiedItems = todoItems.map((item, index) => ({
  ...item,
  createdAt: createdAt - index * 1000 * 60 * 60 * 24,
}))

module.exports = dateModifiedItems
