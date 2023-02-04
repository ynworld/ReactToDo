import { todoItems } from '../mocks/todo-items'

export const getTodoList = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({ items: todoItems })
    }, 1000)
  })
