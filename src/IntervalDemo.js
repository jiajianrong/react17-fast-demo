import React from 'react';
import { useEffect, useCallback } from 'react';


const useInterval =  (fn, time) => useEffect(
  () => {
    const tick = setInterval(fn, time);
    return () => clearInterval(tick);
  },
  [fn, time]
);




export default function App(props) {

  const func = useCallback(() => {
    console.log(new Date())
  }, []);



  useInterval(func, 1000);

  return (
    <div className='App'>
      <h1>Hello React.</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

// Log to console
console.log('Hello console')