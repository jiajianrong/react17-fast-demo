import React from 'react';
import { useEffect, useCallback, useState } from 'react';


const usePosition = () => {

  const [position, setPosition] = useState({
    left: 10,
    top: 10,
  });

  useEffect(() => {
    function handleWindowMouseMove(e) {
      setPosition({left: e.pageX, top: e.pageY});
    }
    window.addEventListener('mousemove', handleWindowMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
    }
  },[]);

  return position;
}



export default function App(props) {


  const position = usePosition();

  return (
    <div style={{height: 300, width: 200, border: "1px solid red"}}>
      {position.left}, {position.top}
    </div>
  );
}
