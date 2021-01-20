// 여러 TodoItem들을 렌더링 해줌

import * as React from 'react';
import TodoItem from './TodoItem';
import { useTodosState } from '../contexts/TodosContext';

function TodoList() {
  const todosState = useTodosState();
  return (
    <ul>
      {todosState.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
}

export default TodoList;