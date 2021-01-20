/**
 * React.FC의 장단점
 *
 * 장점
 * 1. props에 기본적으로 children이 들어가짐
 * 2. defaultProps, propTypes, contextTypes 를 설정 할 때 자동완성이 될 수 있다는 것
 *
 * 단점
 * 1. children이 옵셔널 형태로 들어가 있어서 컴포넌트 props의 타입이 명백하지 않음
 * 2. defaultProps 가 제대로 작동하지 않음
 * */

// 어떤 컴포넌트는 children이 무조건 있어야 하는 경우도 있을 것이고,
// 어떤 컴포넌트는 children 이 들어가면 안되는 경우도 있을 것입니다.
// 결국 그에 대한 처리를 하고 싶다면 Props 타입 안에 children 을 명시해야함.
// type GreetingsProps = {
//   name: string;
//   children: React.ReactNode;
// };

// import React from 'react';
//
// type GreetingsProps = {
//   name: string;
// };
//
// const Greetings: React.FC<GreetingsProps> = ({ name }) => (
//   <div>Hello, {name}</div>
// );
//
// export default Greetings;


/**
 * defaultProps 가 제대로 작동하지 않음
 * */
// import React from 'react';
//
// type GreetingsProps = {
//   name: string;
//   mark: string;
// };
//
// const Greetings: React.FC<GreetingsProps> = ({ name, mark }) => (
// const Greetings: React.FC<GreetingsProps> = ({ name, mark = '!' }) => ( // React.FC 사용 시 defaultProps를 이렇게 지정해줘야 함
//   <div>
//     Hello, {name} {mark}
//   </div>
// );
//
// Greetings.defaultProps = { // defaultProps를 지정해도 React.FC 사용 시 렌더링 하는 곳에서 mark 값을 지정해주지 않으면 mark 값이 없다고 나옴
//   mark: '!'
// };
//
// export default Greetings;


/**
 * React.FC 사용 안할 시
 * */
import * as React from 'react';

type GreetingsProps = {
  name: string;
  mark: string;
  optional?: string; // ? 는 생략 가능하다
  onClick: (name: string) => void; // 아무것도 리턴하지 않는다는 함수를 의미합니다.
};

const Greetings = ({ name, mark, optional, onClick }: GreetingsProps) => {
  const handleClick = () => onClick(name);
  return (
    <div>
      Hello, {name} {mark}
      {optional && <p>{optional}</p>}
      <div>
        <button onClick={handleClick}>Click Me</button>
      </div>
    </div>
  );
};

Greetings.defaultProps = {
  mark: '!'
};

export default Greetings;