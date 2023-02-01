import './App.css';
import { Square, CheckSquare } from 'phosphor-react';

function App() {
  return (
    <div className="wrapper">
      <h1 className="heading-1">Tasks</h1>
      <ul className="todo__list">
        <li className="todo__list-item">
          <Square size={24} />
          <span>
            Dentist Appointment - Prepare the files and do the necessary tests
            suggested beforehand.
          </span>
        </li>
        <li className="todo__list-item">
          <Square size={24} />
          <span>CS-121 Assignment Deadline on Monday</span>
        </li>
        <li className="todo__list-item">
          <Square size={24} />
          <span>Get the electric bulb repaired</span>
        </li>
        <li className="todo__list-item">
          <CheckSquare size={24} weight="fill" />
          <span>Soccer Club Meeting @ Sunday</span>
        </li>
        <li className="todo__list-item">
          <CheckSquare size={24} weight="fill" />
          <span>Buy Gift for Dad's Birthday</span>
        </li>
        <li className="todo__list-item">
          <CheckSquare size={24} weight="fill" />
          <span>Submit Assignment on Friday</span>
        </li>
        <li className="todo__list-item">
          <CheckSquare size={24} weight="fill" />
          <span>Bring Groceries From Supermarket</span>
        </li>
      </ul>
      <button className="button-add">+</button>
    </div>
  );
}

export default App;
