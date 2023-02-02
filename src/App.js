import { Button } from './components/Button'
import { AddCircleIcon } from './components/icons'
import { TodoList } from './components/TodoList'

import './App.css'

const todos = [
  {
    text: 'Dentist Appointment - Prepare the files and do the necessary tests suggested beforehand.',
    isChecked: false,
    id: 1,
  },

  {
    text: 'CS-121 Assignment Deadline on Monday',
    isChecked: false,
    id: 2,
  },
  {
    text: 'Get the electric bulb repaired',
    isChecked: false,
    id: 3,
  },
  {
    text: 'Soccer Club Meeting @ Sunday',
    isChecked: true,
    id: 4,
  },
  {
    text: "Buy Gift for Dad's Birthday",
    isChecked: true,
    id: 5,
  },
  {
    text: 'Submit Assignment on Friday',
    isChecked: true,
    id: 6,
  },
  {
    text: 'Bring Groceries From Supermarket',
    isChecked: true,
    id: 7,
  },
]

function App() {
  return (
    <div className="wrapper">
      <h1 className="title">Tasks</h1>
      <TodoList todos={todos} />
      <Button type="submit" shape="round">
        <AddCircleIcon />
      </Button>
    </div>
  )
}

export default App
