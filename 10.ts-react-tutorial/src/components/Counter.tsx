// import React, {useState} from 'react';
// 이러한 선언 방식은 원래 React가 Default로 export되어 있을 때 가능하지만 사실 React는 Default로 선언되어 있지 않다.
// 따라서 import * as React from 'react'; 와 같이 export를 모아서 선언해줘야 한다.

/**
 * useState 사용
 * */
// import * as React from 'react';
// import { useState } from 'react';
//
// type Information = {
//   name: string;
//   description: string
// };
//
// type Todo = {
//   id: number;
//   text: string;
//   done: boolean
// };
//
// const Counter = () => {
//   // <number> Generics 를 사용하여 해당 상태가 어떤 타입을 가지고 있을지 설정
//   // Generics 를 사용하지 않아도 알아서 타입을 유추하기 때문에 생략해도 상관없다.
//   const [count, setCount] = useState<number>(0);
//
//   // Generics은 상태가 null일 수도 있고 아닐수도 있을때 활용하면 좋다.
//   const [info, setInformation] = useState<Information | null>(null); // 타입이 Information 이거나 null 일 경우
//
//   // Generics은  상태의 타입이 까다로운 구조를 가진 객체이거나 배열일 때 명시하는 것이 좋다.
//   const [index, setTodos] = useState<Todo[]>([]);
//
//   /**
//    * 배열인 경우에는 위와 같이 빈 배열만 넣었을 때 해당 배열이 어떤 타입으로 이루어진 배열인지 추론 할 수 없기 때문에 Generics 를 명시해야 한다.
//    * 만약 Generics 를 사용하지 않는다면 다음과 같이 할 수도 있긴 하지만 코드가 별로 예쁘지 않다.
//    * as 는 Type Assertion 이라는 문법, '특정 값이 특정 타입이다'라는 정보를 덮어 쓸 수 있는 문법
//    */
//   const [dos, setDos] = useState([] as Todo[]);
//
//
//
//   const onIncrease = () => setCount(count + 1);
//   const onDecrease = () => setCount(count - 1);
//   return (
//     <div>
//       <h1>{count}</h1>
//       <div>
//         <button onClick={onIncrease}>+1</button>
//         <button onClick={onDecrease}>-1</button>
//       </div>
//     </div>
//   );
// };
//
// // React component names must start with an uppercase
// export default Counter;

/**
 * useReducer 사용
 * */
import * as React from 'react';
import { useReducer } from 'react';

type Action = { des: 'INCREASE' } | { des: 'DECREASE' }; // 이렇게 액션을 | 으로 연달아서 쭉 나열
// 지금은 액션들이 des 값만 있어서 굉장히 간단한데,
// 만약 액션 객체에 필요한 다른 값들이 있는 경우엔 다른 값들도 타입안에 명시를 해주면
// 추후 리듀서를 작성 할 때 액션 객체 안에 무엇이 들어있는지도 자동완성을 통해서 알 수 있다.
// 추가적으로, 새로운 액션을 디스패치 할 때에도 액션에 대한 타입스크립트 타입검사도 해줌.

// useState의 State를 변경하는 함수는 넘긴 값을 그대로 다음 State로 사용하지만,
// useReducer의 State를 변경하는 함수는 reducer를 거치면서 추가적으로 가공한 State로 사용할 수 있습니다.


// 리듀서를 만들 땐 파라미터로 받아오는 상태의 타입과 함수가 리턴하는 타입을 동일하게 하는 것이 매우 중요하다.
// 리턴 타입을 상태와 동일한 타입으로 설정함으로써 실수들을 방지 (예: 특정 케이스에 결과값을 반환하지 않았거나, 상태의 타입이 바뀌게 되었을 경우 에러를 감지)
const reducer = (state: number, action: Action): number => {
  switch (action.des) {
    case 'INCREASE':
      return state + 1;
    case 'DECREASE':
      return state - 1;
    default:
      throw new Error('Unhandled action');
  }
};

const Counter = () => {
  const [count, dispatch] = useReducer(reducer, 0);
  const onIncrease = () => dispatch({ des: 'INCREASE' });
  const onDecrease = () => dispatch({ des: 'DECREASE' });

  return (
    <div>
      <h1>{count}</h1>
      <div>
        <button onClick={onIncrease}>+1</button>
        <button onClick={onDecrease}>-1</button>
      </div>
    </div>
  );
};

export default Counter;