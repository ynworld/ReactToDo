import './App.css'
import { IconContext, Square, CheckSquare } from 'phosphor-react'
import Button from './UI/Button'

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
    <IconContext.Provider
      value={{
        color: '#4fc41d',
        size: 32,
        weight: 'bold',
      }}
    >
      <div className="wrapper">
        <h1 className="heading-1">Tasks</h1>
        <ul className="todo__list">
          {todos.map((todo) => (
            <li key={todo.id}>
              <article className="todo__list-item">
                <label htmlFor={todo.id} className="todo__list-label">
                  {todo.isChecked && <CheckSquare className="list-item__icon" weight="fill" />}
                  {!todo.isChecked && <Square className="list-item__icon" />}
                  <input type="checkbox" id={todo.id} className="list-item__checkbox" />
                  <span className="list-item__text">{todo.text}</span>
                </label>
              </article>
            </li>
          ))}
        </ul>
        <Button type="submit" style="round">
          +
        </Button>
      </div>
    </IconContext.Provider>
  )
}

export default App
