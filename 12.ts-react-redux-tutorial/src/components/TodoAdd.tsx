/** 새 항목을 등록 할 수 있는 컴포넌트 */

// 인풋의 상태는 useState 를 사용하여 로컬 상태로 관리
// 실제로 등록하는 함수의 경우 추후 커스텀 Hook 을 작성해서 구현

import * as React from 'react';
import { ChangeEvent, FormEvent, useState } from 'react';
import useAddTodo from '../customHooks/useAddTodo';

function TodoAdd() {
  const [value, setValue] = useState('');
  const addTodo = useAddTodo();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    addTodo(value);
    setValue('');
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        placeholder="할 일을 입력하세요."
        value={value}
        onChange={onChange}
      />
      <button type="submit">등록</button>
    </form>
  );
}

export default TodoAdd;