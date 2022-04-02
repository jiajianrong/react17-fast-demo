import React, { useState } from 'react';
import { useEffect, useCallback, useRef } from 'react';


// export default function Counter() {
//   let [count, setCount] = useState(0);

//   useInterval(() => {
//     // 你自己的代码
//     setCount(count + 1);
//   }, 1000);

//   return <h1>{count}</h1>;
// }

export default function Counter() {
  let [count, setCount] = useState(0);

  function callback() {
    setCount(count + 1);
  }

  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });


  useEffect(() => {
    let id = setInterval(() => {
      savedCallback.current();
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <h1>{count}</h1>;
}


//-----------------------------


// const useCounter = (start) => {
//   let [count, setCount] = useState(0);

//   console.log(count);
  
//   useEffect(
//     () => {
//       //setCount(start);

//       const tick = setInterval(()=>{
//         setCount(count=>+count+1);
//       }, 1000);
//       return ()=>{
//         console.log('clear interval');
        
//         clearInterval(tick)
//       };
//     },
//     [start]
//   );

//   return count + +start;
// }


// export default function App(props) {

//   let [start, setStart] = useState(0);
  

//   let count = useCounter(start);

//   return (
//     <div className='App'>
//       {count}
//       <input onChange={e=>setStart(e.target.value)}></input>
//     </div>
//   );
// }
