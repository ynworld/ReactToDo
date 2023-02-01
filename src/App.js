import './App.css';
import { IconContext, Square, CheckSquare } from 'phosphor-react';

function App() {
  const todos = [
    {
      item: 'Dentist Appointment - Prepare the files and do the necessary tests suggested beforehand.',
      isChecked: false,
    },

    {
      item: 'CS-121 Assignment Deadline on Monday',
      isChecked: false,
    },
    {
      item: 'Get the electric bulb repaired',
      isChecked: false,
    },
    {
      item: 'Soccer Club Meeting @ Sunday',
      isChecked: true,
    },
    {
      item: "Buy Gift for Dad's Birthday",
      isChecked: true,
    },
    {
      item: 'Submit Assignment on Friday',
      isChecked: true,
    },
    {
      item: 'Bring Groceries From Supermarket',
      isChecked: true,
    },
  ];
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
            <li key={todo.item}>
              <article className="todo__list-item">
                {todo.isChecked && (
                  <CheckSquare className="list-item__icon" weight="fill" />
                )}
                {!todo.isChecked && <Square className="list-item__icon" />}
                <input
                  type="checkbox"
                  id={todo.item}
                  className="list-item__checkbox"
                />
                <label for={todo.item} className="list-item__text">
                  {todo.item}
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
