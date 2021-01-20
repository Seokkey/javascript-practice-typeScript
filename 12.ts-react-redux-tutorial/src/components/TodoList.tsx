/** 여러개의 TodoItem 컴포넌트를 보여주는 컴포넌트 */

import * as React from 'react';
import TodoItem from './TodoItem';
import useTodos from '../customHooks/useTodos';

function TodoList() {
  const todos = useTodos();

  if (todos.length === 0) return <p>등록된 항목이 없습니다.</p>;

  return (
    <ul>
      {todos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
}

export default TodoList;