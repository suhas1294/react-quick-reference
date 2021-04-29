// just like useCallback is used to memoize functions, 
// useMemo is memoize any type of objects (any reference type objects like arrays, objects etc)
// useCallback is used more frequently compared to useMemo, where there is some 
// cpu intensive tasks on data, then we memoize data using useMemo

// ________________________________________________
// src/App.js

import React, { useState, useCallback, useMemo } from 'react';

import './App.css';
import DemoList from './components/Demo/DemoList';
import Button from './components/UI/Button/Button';

function App() {
  const [listTitle, setListTitle] = useState('My List');

  const changeTitleHandler = useCallback(() => {
    setListTitle('New Title');
  }, []);

  const listItems = useMemo(() => [5, 3, 1, 10, 9], []); // empty dependency array because nothing changes inside '[5, 3, 1, 10, 9]', 
  // there is not external dependency inside '[5, 3, 1, 10, 9]'

  return (
    <div className="app">
      <DemoList title={listTitle} items={listItems} />
      <Button onClick={changeTitleHandler}>Change List Title</Button>
    </div>
  );
}
export default App;

// ________________________________________________
// src/components/Demo/DemoList.js

import React, { useMemo } from 'react';

import classes from './DemoList.module.css';

const DemoList = (props) => {
  const { items } = props;

  const sortedList = useMemo(() => {
    console.log('Items sorted');
    return items.sort((a, b) => a - b);
  }, [items]); 
  console.log('DemoList RUNNING');

  return (
    <div className={classes.list}>
      <h2>{props.title}</h2>
      <ul>
        {sortedList.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(DemoList);



