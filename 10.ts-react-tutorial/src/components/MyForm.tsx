import * as React from 'react';
import { useState, useRef } from 'react';

type MyFormProps = {
  onSubmit: (form: { name: string; description: string }) => void;
};

const MyForm = ({ onSubmit }: MyFormProps) => {

  /**
   * useRef
   * 외부 라이브러리의 인스턴스 또는 DOM 을 특정 값 안에 담을 때 사용
   * 변수 값을 관리
   * ref를 사용 할 때 DOM 위에 마우스 커서를 대면 타입이 나온다.
   * 초기값은 null 로
   * */
  // <HTMLInputElement> DOM 객체를 할당?
  const inputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: '',
    description: ''
  });

  const { name, description } = form;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
      // value값을 엘리먼트 name 값에 따라 넣어주도록
      // 하나는 엘리먼트의 속성 값 [name]: value 그대로
      // 하나는 스프레드 연산자를 사용해서 값 할당
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      name: '',
      description: ''
    }); // 초기화

    // null 체크 필수
    // 타입스크립트에서 만약 어떤 타입이 undefined 이거나 null 일 수 있는 상황에는, 해당 값이 유효한지 체킹하는 작업을 꼭 해주어야 자동완성도 잘 이루어지고, 오류도 사라집니다.
    if (!inputRef.current) {
      return;
    } else {
      inputRef.current.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={name} onChange={onChange} ref={inputRef}/>
      <input name="description" value={description} onChange={onChange} />
      <button type="submit">등록</button>
    </form>
  );
}

export default MyForm;