import './App.css'
import Button from './UI/Button'
import TodoList from './components/TodoList'
import Wrapper from './UI/Wrapper'

const todos = [
  {
    text: 'Dentist Appointment - Prepare the files and do the necessary tests suggested beforehand.',
    isChecked: false,
    id: 'td1',
  },

  {
    text: 'CS-121 Assignment Deadline on Monday',
    isChecked: false,
    id: 'td2',
  },
  {
    text: 'Get the electric bulb repaired',
    isChecked: false,
    id: 'td3',
  },
  {
    text: 'Soccer Club Meeting @ Sunday',
    isChecked: true,
    id: 'td4',
  },
  {
    text: "Buy Gift for Dad's Birthday",
    isChecked: true,
    id: 'td5',
  },
  {
    text: 'Submit Assignment on Friday',
    isChecked: true,
    id: 'td6',
  },
  {
    text: 'Bring Groceries From Supermarket',
    isChecked: true,
    id: 'td7',
  },
]

function App() {
  return (
    <Wrapper title="Tasks">
      <TodoList todos={todos} />
      <Button type="submit" style="round" text="+" />
    </Wrapper>
  )
}

export default App
