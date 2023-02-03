import { Button, TodoList } from './components'
import { AddCircleIcon } from './components/icons'

import ListItem from './store/ListItem'
import ListStore from './store/ListStore'

import './App.css'

const todos = new ListStore([
  new ListItem(
    'Dentist Appointment - Prepare the files and do the necessary tests suggested beforehand.',
  ),
  new ListItem('CS-121 Assignment Deadline on Monday'),
  new ListItem('Get the electric bulb repaired'),
  new ListItem('Soccer Club Meeting @ Sunday'),
  new ListItem("Buy Gift for Dad's Birthday"),
  new ListItem('Submit Assignment on Friday'),
  new ListItem('Get the electric bulb repaired'),
])

const App = () => {
  return (
    <div className="wrapper">
      <h1 className="title">Tasks</h1>
      <TodoList todos={todos.items} />
      <Button type="submit" shape="round" addItem={todos.addItem}>
        <AddCircleIcon />
      </Button>
    </div>
  )
}

export default App
