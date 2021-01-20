// 하나는 상태 전용 Context 이고, 또 다른 하나는 디스패치 전용 Context
// 두 개의 Context 를 만들면 낭비 렌더링을 방지 할 수 있습니다. ??
// 만약 상태와 디스패치 함수를 한 Context 에 넣게 된다면, ??
// TodoForm 컴포넌트처럼 상태는 필요하지 않고 디스패치 함수만 필요한 컴포넌트도 상태가 업데이트 될 때 리렌더링하게 됩니다. (Context의 에서 가져와야 되는 기본 상태가 필요 없다는 얘기인듯)
// 두 개의 Context를 만들어서 관리한다면 이를 방지 할 수 있습니다. ???

import * as React from 'react';
import { createContext, Dispatch, useReducer, useContext } from 'react';

// 나중에 다른 컴포넌트에서 타입을 불러와서 쓸 수 있도록 내보내겠습니다.
export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

/** 상태 전용 context */
// 추후 Provider를 사용하지 않았을 때에는 Context의 값이 undefined 가 되어야 하므로, (Provider를 사용하지 않았을 때??)
// <TodosState | undefined> 처럼 Context 의 값이 TodosState 일 수도 있고 undefined 일 수도 있다고 선언
type TodosState = Todo[];
const TodosStateContext = createContext<TodosState | undefined>(undefined);


// 액션들의 타입을 선언해주고 나면, 우리가 디스패치를 위한 Context를 만들 때 디스패치 함수의 타입을 설정 할 수 있게 됩니다.
type Action =
  | { type: 'CREATE'; text: string }
  | { type: 'TOGGLE'; id: number }
  | { type: 'REMOVE'; id: number };

/** 디스패치 전용 context */
// Dispatch에 Generic으로 액션들의 타입을 넣어주면 추후 컴포넌트에서 액션을 디스패치 할 때
// 액션들에 대한 타입을 검사 할 수 있다. 액션에 추가적으로 필요한 값(예: text, id)이 빠지면 오류가 발생

type TodosDispatch = Dispatch<Action>;
const TodosDispatchContext = createContext<TodosDispatch | undefined>(
  undefined
);

/** 리듀서 */
function todosReducer(state: TodosState, action: Action): TodosState {
  switch (action.type) {
    case 'CREATE':
      // state가 빈 배열인 경우 max 함수가 -Infinity를 반환해 아이템을 제거할 때 모든 아이템을 제거되기에 초기값 0 추가
      const nextId = Math.max(0,...state.map(todo => todo.id)) + 1;
      return state.concat({
        id: nextId,
        text: action.text,
        done: false
      });
    case 'TOGGLE':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case 'REMOVE':
      return state.filter(todo => todo.id !== action.id);
    default:
      throw new Error('Unhandled action');
  }
}

/** Provider */
export function TodosContextProvider({ children }: { children: React.ReactNode }) {
  const [todos, dispatch] = useReducer(todosReducer, [
    {
      id: 1,
      text: 'Context API 배우기',
      done: true
    },
    {
      id: 2,
      text: 'TypeScript 배우기',
      done: true
    },
    {
      id: 3,
      text: 'TypeScript 와 Context API 함께 사용하기',
      done: false
    }
  ]);

  return (
    <TodosDispatchContext.Provider value={dispatch}>
      <TodosStateContext.Provider value={todos}>
        {children}
      </TodosStateContext.Provider>
    </TodosDispatchContext.Provider>
  );
}

export function useTodosState() {
  const state = useContext(TodosStateContext);
  if (!state) throw new Error('TodosProvider not found');
  return state;
}

export function useTodosDispatch() {
  const dispatch = useContext(TodosDispatchContext);
  if (!dispatch) throw new Error('TodosProvider not found');
  return dispatch;
}

