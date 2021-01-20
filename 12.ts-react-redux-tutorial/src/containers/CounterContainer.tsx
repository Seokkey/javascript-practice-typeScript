import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux';
import { increase, decrease, increaseBy } from '../redux/counter/counter';
import Counter from '../components/Counter';

function CounterContainer() {
  const count = useSelector((state: RootState) => state.counter.count); // index.ts combineReducers에 counter
  const dispatch = useDispatch();

  const onIncrease = () => {
    dispatch(increase());
  };

  const onDecrease = () => {
    dispatch(decrease());
  };

  const onIncreaseBy = (diff: number) => {
    dispatch(increaseBy(diff));
  };

  return (
    <Counter
      count={count}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onIncreaseBy={onIncreaseBy}
    />
  );
}

export default CounterContainer;
