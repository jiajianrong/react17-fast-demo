import React from 'react';
import { useEffect, useCallback, useState } from 'react';


function useBodyScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    document.addEventListener('scroll', handleScroll);
    return () =>
      document.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollPosition;
}



export default function App(props) {


  const position = useBodyScrollPosition();

  return (
    <div style={{height: 3000, width: 200, border: "1px solid red"}}>
     <span style={{position: "fixed", top:0, left: 0}}> {position} </span>
    </div>
  );
}
