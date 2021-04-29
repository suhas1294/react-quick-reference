// src/hook/use-counter.jsx

// step-1 : defined your own hook starting with 'use' keyword and export it.

// The state variables defined in our custom hook are kind of shared with those components where usecustom hook is used.
// when multiple components are using our Custom hook, 
// each of those components will get their own copy of state variables which are used in useCustomhook.js file.

import { useState, useEffect } from 'react';

const useCounter = (forwards = true) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (forwards) {
        setCounter((prevCounter) => prevCounter + 1);
      } else {
        setCounter((prevCounter) => prevCounter - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [forwards]);

  return counter;
};

export default useCounter;

// ------------------------------------------------------------
// src/components/forwardCounter.js

import useCounter from '../hooks/use-counter';

const ForwardCounter = () => {
  const counter = useCounter();
  return <Card>{counter}</Card>;
};
export default ForwardCounter;

// ------------------------------------------------------------
// src/components/backwardCounter.js

import useCounter from '../hooks/use-counter';

const BackwardCounter = () => {
  const counter = useCounter(false);
  return <Card>{counter}</Card>;
};
export default BackwardCounter;
