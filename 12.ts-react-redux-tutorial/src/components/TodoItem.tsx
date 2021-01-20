/** 할 일 정보를 보여주는 컴포넌트 */

// 텍스트 영역을 클릭하면 done 값이 바뀌고, 우측의 (X) 를 클릭하면 삭제
// 할 일 정보를 지니고 있는 todo를 props로 받아옴
// 상태 토글 및 삭제를 해주는 함수 onToggle, onRemove 의 경우엔 추후 커스텀 Hook 을 작성하여 구현

import * as React from 'react';
import '../css/TodoItem.css';
import { Todo } from '../redux/todos';
import useTodoActions from '../customHooks/useTodoActions';

type TodoItemProps = {
  todo: Todo;
};

function TodoItem({ todo }: TodoItemProps) {
  const { onToggle, onRemove } = useTodoActions(todo.id);
  return (
    <li className={`TodoItem ${todo.done ? 'done' : ''}`}>
      <span className="text"  onClick={onToggle}>{todo.text}</span>
      <span className="remove" onClick={onRemove}>(X)</span>
    </li>
  );
}

export default TodoItem;