// 초기값 설정
import {TodosAction, TodosState} from "./types";
import {ADD_TODO, REMOVE_TODO, TOGGLE_TODO} from "./actions";

const initialState: TodosState = [
  { id: 1, text: '타입스크립트 배우기', done: true },
  { id: 2, text: '타입스크립트와 리덕스 함께 사용해보기', done: true },
  { id: 3, text: '투두리스트 만들기', done: false }
];

// 리듀서
function todos(state: TodosState = initialState, action: TodosAction) : TodosState {
  switch (action.type) {
    case ADD_TODO:
      // 새 항목을 만들 때 마다 고유 ID를 설정하기 위하여 현재 상태의 모든 항목들의 id 를 체크하고 그 중 가장 큰 값을 사용하도록 처리
      const nextId = Math.max(0,...state.map(todo => todo.id)) + 1;
      return state.concat({
        id: nextId,
        text: action.payload,
        done: false
      });
    case TOGGLE_TODO:
      return state.map(todo => todo.id === action.payload ? {...todo, done: !todo.done} : todo);
    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
}
export default todos;