import './App.css';
import { IconContext, Square, CheckSquare } from 'phosphor-react';

function App() {
  const todoItems = [
    'Dentist Appointment - Prepare the files and do the necessary tests suggested beforehand.',
    'CS-121 Assignment Deadline on Monday',
    'Get the electric bulb repaired',
    'Soccer Club Meeting @ Sunday',
    "Buy Gift for Dad's Birthday",
    'Submit Assignment on Friday',
    'Bring Groceries From Supermarket',
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
          {todoItems.map(item => (
            <li key={item}>
              <article className="todo__list-item">
                <Square className="list-item__icon" />
                <span className="list-item__text">{item}</span>
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
