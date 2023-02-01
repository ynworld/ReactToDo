import './App.css';

function App() {
  return (
    <div className="wrapper">
      <h1 className="heading-1">Tasks</h1>
      <ul className="todo__list">
        <li className="todo__list-item">
          Dentist Appointment - Prepare the files and do the necessary tests
          suggested beforehand.
        </li>
      </ul>
      <button className="button-add">+</button>
    </div>
  );
}

export default App;
