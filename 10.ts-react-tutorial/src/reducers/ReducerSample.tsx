import * as React from 'react';
import { useReducer } from 'react';

type Color = 'red' | 'orange' | 'yellow';

type SampleState = {
  count: number;
  text: string;
  color: Color;
  isGood: boolean;
};

type Action =
  | { des: 'SET_COUNT'; count: number }
  | { des: 'SET_TEXT'; text: string }
  | { des: 'SET_COLOR'; color: Color }
  | { des: 'TOGGLE_GOOD' };

function reducer1(state: SampleState, action: Action): SampleState {
  switch (action.des) {
    case 'SET_COUNT':
      return {
        ...state,
        count: action.count // count가 자동완성되며, number 타입인걸 알 수 있습니다.
      };
    case 'SET_TEXT':
      return {
        ...state,
        text: action.text // text가 자동완성되며, string 타입인걸 알 수 있습니다.
      };
    case 'SET_COLOR':
      return {
        ...state,
        color: action.color // color 가 자동완성되며 color 가 Color 타입인걸 알 수 있습니다.
      };
    case 'TOGGLE_GOOD':
      return {
        ...state,
        isGood: !state.isGood
      };
    default:
      throw new Error('Unhandled action');
  }
}

function ReducerSample() {
  // useReducer(?,?) 첫번째 파라미터는 리듀서 함수, 두번째 파라미터는 State 값
  const [sampleState, dispathSampleState] = useReducer(reducer1, {
    count: 0,
    text: 'hello',
    color: 'red',
    isGood: true
  });

  const setCount = () => dispathSampleState({ des: 'SET_COUNT', count: 5 }); // count 를 넣지 않으면 에러발생
  const setText = () => dispathSampleState({ des: 'SET_TEXT', text: 'bye' }); // text 를 넣지 않으면 에러 발생
  const setColor = () => dispathSampleState({ des: 'SET_COLOR', color: 'orange' }); // orange 를 넣지 않으면 에러 발생
  const toggleGood = () => dispathSampleState({ des: 'TOGGLE_GOOD' });

  return (
    <div>
      <p>
        <code>count: </code> {sampleState.count}
      </p>
      <p>
        <code>text: </code> {sampleState.text}
      </p>
      <p>
        <code>color: </code> {sampleState.color}
      </p>
      <p>
        <code>isGood: </code> {sampleState.isGood ? 'true' : 'false'}
      </p>
      <div>
        <button onClick={setCount}>SET_COUNT</button>
        <button onClick={setText}>SET_TEXT</button>
        <button onClick={setColor}>SET_COLOR</button>
        <button onClick={toggleGood}>TOGGLE_GOOD</button>
      </div>
    </div>
  );
}

export default ReducerSample;