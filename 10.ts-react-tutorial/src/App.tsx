/**
 * Gretings
 * */
// import React from 'react';
// import Greetings from './components/Gretings';
//
// const App: React.FC = () => {
//   const onClick = (name: string) => {
//     console.log(`${name} says hello`);
//   };
//   return <Greetings name="Hello" onClick={onClick} />;
// };
//
// export default App;

/**
 * Counter
 * */
// import React from 'react';
// import Counter from './components/Counter';
//
// const App: React.FC = () => {
//   return <Counter />;
// };
//
// export default App;


/**
 * MyForm
 * */
import * as React from 'react';
import MyForm from './components/MyForm';

const App: React.FC = () => {
  const onSubmit = (form: { name: string; description: string }) => {
    console.log(form);
  };
  return <MyForm onSubmit={onSubmit} />;
};

export default App;

/**
 * ReducerSample
 * */
// import React from 'react';
// import ReducerSample from './reducers/ReducerSample';
//
// const App: React.FC = () => {
//   return <ReducerSample />;
// };
//
// export default App;
