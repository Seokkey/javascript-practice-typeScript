/**
 * Redux Ducks Pattern
 *
 * 액션의 type, 액션 생성함수, 리듀서를 모두 한 파일에 작성해서 하나의 파일만 관리하도록
 *
 * 1. 항상 reducer()란 이름의 함수를 export default 해야한다.
 * 2. 항상 모듈의 action 생성자들을 함수형태로 export 해야한다.
 * 3. 항상 npm-module-or-app/reducer/ACTION_TYPE 형태의 action 타입을 가져야한다.
 * 4. 쩌면 action 타입들을 UPPER_SNAKE_CASE로 export 할 수 있다.
 * */

import {
  createAction,
  ActionType,
  createReducer
} from 'typesafe-actions';

// /** 액션 type 선언 */
// const INCREASE = 'counter/INCREASE' as const;
// const DECREASE = 'counter/DECREASE' as const;
// const INCREASE_BY = 'counter/INCREASE_BY' as const;
// // as const는 const assertions라는 TypeScript 문법이다.
// // 이 문법을 사용하면 우리가 추후 액션 생성함수를 통해 액션 객체를 만들게 됐을 때
// // 액션type의 TypeScript 타입이 string이 되지 않고 실제값을 가르키게 된다.

/** 액션 type 선언 리팩토링 */
//typesafe-actions 의 사용으로 as const 불필요
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';
const INCREASE_BY = 'counter/INCREASE_BY';

// /** 액션 생성 함수 선언 */
// export const increase = () => ({ type: INCREASE });
// export const decrease = () => ({ type: DECREASE });
// export const increaseBy = (diff: number) => ({
//   type: INCREASE_BY,
//   // diff라는 값을 파라미터로 받아와서 액션의 payload값으로 설정, 값의 이름을 payload로 바꿔주었는데 이는 FSA 규칙을 따루기 위함
//   // 액션 객체의 구조를 일관성 있게 가져갈 수 있어서 추후 리듀서에서 액션을 다룰 때에도 편하고, 읽기 쉽고, 액션에 관련된 라이브러리를 사용 할 수도 있게 해줍니다.
//   payload: diff
// });

/** 액션 생성 함수 선언 리팩토링 */
// 액션의 페이로드로 들어가는 값은 Generic을 사용하여 정해줄 수 있으며, 만약 액션의 페이로드에 아무것도 필요 없다면 Generic 생략
// 가끔 액션 생성 함수에 파라미터로 넣어주는 값과 액션의 페이로드 값이 완벽히 일치하지 않을 때가 있다.
// id값을 nanoid같은 라이브러리를 사용하여 고유 값을 생성 => 파라미터 값은 name 하나인데 payload 값은 id, name
// const createItem = (name: string) => ({ type: CREATE_ITEM, payload: { id: nanoid(), name } });
// 이렇게 만들면 됨 -> const createItem = createAction(CREATE_ITEM).map(name => ({ payload: { id: nanoid(), name } }));
export const increase = createAction(INCREASE)();
export const decrease = createAction(DECREASE)();
export const increaseBy = createAction(INCREASE_BY)<number>();

// /** 액션 객체 TypeScript 타입 선언 */
// ReturnType 은 함수에서 반환하는 타입을 가져올 수 있게 해주는 유틸 타입
// type CounterAction =
//   | ReturnType<typeof increase> // 액션 타입 선언 시 as const 처리하지 않으면 ReturnType을 사용하게 됐을 때 type 의 타입이 무조건 string
//   | ReturnType<typeof decrease>
//   | ReturnType<typeof increaseBy>;

/** 액션 객체 TypeScript 타입 선언 리팩토링 */
// actions 라는 객체에 모든 액션 생성함수를 넣은 다음에, ActionType으로 감쌈
const actions = { increase, decrease, increaseBy };
type CounterAction = ActionType<typeof actions>;

/** 상태 값 TypeScript 타입 선언 */
// interface CounterState {
//   count: number;
// }
type CounterState = {
  count: number;
}

/** 상태 초기값 선언 */
const initialState: CounterState = {
  count: 0
};


/** 리듀서 선언 */
// 함수의 반환 타입에 상태의 타입을 넣음으로서 사소한 실수 방지
// const counter = (state: CounterState = initialState, action: CounterAction) : CounterState => {
//   switch (action.type) {
//     case INCREASE:
//       return { count: state.count + 1 };
//     case DECREASE:
//       return { count: state.count - 1 };
//     case INCREASE_BY:
//       return { count: state.count + action.payload };
//     default:
//       return state;
//   }
// };

/** 리듀서 선언 리팩토링 */
// createReducer를 사용하면 리듀서를 switch/case 문이 아닌 object map 형태로 구현 할 수 있어서 코드가 더욱 간결해
// createReducer 를 사용 할 때에는 Generic 으로 상태의 타입과 액션들의 타입을 넣어주어야 합니다.
// createReducer에서는 이를 사용하여 내부에 각각 액션들을 위하여 구현할 함수에서 타입을 추론합니다.
const counter = createReducer<CounterState, CounterAction>(initialState, {
  [INCREASE]: state => ({ count: state.count + 1 }),
  [DECREASE]: state => ({ count: state.count - 1 }),
  [INCREASE_BY]: (state, action) => ({ count: state.count + action.payload })
});

/**
 * 리듀서 이렇게도 가능함 handleAction 나중에 확인
 *
 * const counter = createReducer<CounterState, CounterAction>(initialState)
 *  .handleAction(INCREASE, state => ({ count: state.count + 1 }))
 *  .handleAction(DECREASE, state => ({ count: state.count - 1 }))
 *  .handleAction(INCREASE_BY, (state, action) => ({
 *   count: state.count + action.payload
 * }));
 * */

export default counter;