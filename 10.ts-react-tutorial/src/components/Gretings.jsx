"use strict";
/**
 * React.FC의 장단점
 *
 * 장점
 * 1. props에 기본적으로 children이 들어가짐
 * 2. defaultProps, propTypes, contextTypes 를 설정 할 때 자동완성이 될 수 있다는 것
 *
 * 단점
 * 1. children이 옵셔널 형태로 들어가 있어서 컴포넌트 props의 타입이 명백하지 않음
 * */
Object.defineProperty(exports, "__esModule", { value: true });
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
 * React.FC 사용 안할 시
 * */
var react_1 = require("react");
var Greetings = function (_a) {
    var name = _a.name, mark = _a.mark, optional = _a.optional, onClick = _a.onClick;
    var handleClick = function () { return onClick(name); };
    return (<div>
      Hello, {name} {mark}
      {optional && <p>{optional}</p>}
      <div>
        <button onclick={handleClick}>Click Me</button>
      </div>
    </div>);
};
Greetings.defaultProps = {
    mark: '!'
};
exports.default = Greetings;
