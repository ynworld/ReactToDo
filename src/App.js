import './App.css';
import { IconContext, Square, CheckSquare } from 'phosphor-react';

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
          <li className="todo__list-item">
            <Square className="list-item__icon" />
            <span className="list-item__text">
              Dentist Appointment - Prepare the files and do the necessary tests
              suggested beforehand.
            </span>
          </li>
          <li className="todo__list-item">
            <Square />
            <span className="list-item__text">
              CS-121 Assignment Deadline on Monday
            </span>
          </li>
          <li className="todo__list-item">
            <Square />
            <span className="list-item__text">
              Get the electric bulb repaired
            </span>
          </li>
          <li className="todo__list-item">
            <CheckSquare weight="fill" />
            <span className="list-item__text">
              Soccer Club Meeting @ Sunday
            </span>
          </li>
          <li className="todo__list-item">
            <CheckSquare weight="fill" />
            <span className="list-item__text">Buy Gift for Dad's Birthday</span>
          </li>
          <li className="todo__list-item">
            <CheckSquare weight="fill" />
            <span className="list-item__text">Submit Assignment on Friday</span>
          </li>
          <li className="todo__list-item">
            <CheckSquare weight="fill" />
            <span className="list-item__text">
              Bring Groceries From Supermarket
            </span>
          </li>
        </ul>
        <button className="button-add">+</button>
      </div>
    </IconContext.Provider>
  );
}

export default App;
