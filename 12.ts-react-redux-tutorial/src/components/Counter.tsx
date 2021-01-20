/** 일반적인 컨테이너, 컴포넌트 분리 구조 */
import * as React from 'react';

// 컨테이너에서 받아오는 props 타입 선언
type CounterProps = {
  count: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onIncreaseBy: (diff: number) => void;
};

function Counter ({
                   count,
                   onIncrease,
                   onDecrease,
                   onIncreaseBy // dispatch(increaseBy(diff));
                 }: CounterProps) {
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
      <button onClick={() => onIncreaseBy(5)}>+5</button>
    </div>
  );
};

export default Counter;

// /** 커스텀 Hook을 사용해서 프레젠테이셔널 영역 통합 */
// import * as React from 'react';
// import useCounter from '../customHooks/useCounter';
//
// function Counter() {
//   const { count, onIncrease, onDecrease, onIncreaseBy } = useCounter();
//
//   return (
//     <div>
//       <h1>{count}</h1>
//       <button onClick={onIncrease}>+1</button>
//       <button onClick={onDecrease}>-1</button>
//       <button onClick={() => onIncreaseBy(5)}>+5</button>
//     </div>
//   );
// }
//
// export default Counter;