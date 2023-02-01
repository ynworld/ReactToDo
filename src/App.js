import './App.css';
import { IconContext, Square, CheckSquare } from 'phosphor-react';

const todos = [
  {
    text: 'Dentist Appointment - Prepare the files and do the necessary tests suggested beforehand.',
    isChecked: false,
  },

  {
    text: 'CS-121 Assignment Deadline on Monday',
    isChecked: false,
  },
  {
    text: 'Get the electric bulb repaired',
    isChecked: false,
  },
  {
    text: 'Soccer Club Meeting @ Sunday',
    isChecked: true,
  },
  {
    text: "Buy Gift for Dad's Birthday",
    isChecked: true,
  },
  {
    text: 'Submit Assignment on Friday',
    isChecked: true,
  },
  {
    text: 'Bring Groceries From Supermarket',
    isChecked: true,
  },
];

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
          {todos.map(todo => (
            <li key={todo.text}>
              <article className="todo__list-item">
                <label for={todo.text} className="todo__list-label">
                  {todo.isChecked && (
                    <CheckSquare className="list-item__icon" weight="fill" />
                  )}
                  {!todo.isChecked && <Square className="list-item__icon" />}
                  <input
                    type="checkbox"
                    id={todo.text}
                    className="list-item__checkbox"
                  />
                  <span className="list-item__text">{todo.text}</span>
                </label>
              </article>
            </li>
          ))}
        </ul>
        <button type="submit" className="button-add">
          +
        </button>
      </div>
    </IconContext.Provider>
  );
}

export default App;
