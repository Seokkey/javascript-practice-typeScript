// 액션 type
const ADD_TODO = 'todoAllInOne/ADD_TODO' as const;
const TOGGLE_TODO = 'todoAllInOne/TOGGLE_TODO' as const;
const REMOVE_TODO = 'todoAllInOne/REMOVE_TODO' as const;

// 액션 생성 함수
export const addTodo = (text: string) => ({
  type: ADD_TODO,
  payload: text
});

export const toggleTodo = (id: number) => ({
  type: TOGGLE_TODO,
  payload: id
});

export const removeTodo = (id: number) => ({
  type: REMOVE_TODO,
  payload: id
});

// 액션들의 타입스크립트 타입 준비
type TodosAction =
  | ReturnType<typeof addTodo>
  | ReturnType<typeof toggleTodo>
  | ReturnType<typeof removeTodo>;

// 상태를 위한 타입 선언
export interface Todo {
  id: number;
  text: string;
  done: boolean;
};

// Todo의 배열
interface TodosState extends Array<Todo>{};

// 초기값 설정
const initialState: TodosState = [
  { id: 1, text: '타입스크립트 배우기', done: true },
  { id: 2, text: '타입스크립트와 리덕스 함께 사용해보기', done: true },
  { id: 3, text: '투두리스트 만들기', done: false }
];

// 리듀서
function todoAllInOne(state: TodosState = initialState, action: TodosAction) : TodosState {
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
export default todoAllInOne;
