// Its mainly used to prevent infinite loop
// say you have create a nested component and passing a callback from parent component to child component
// whenever parent component re-renders, call back will be re-created in child component resulting in infinite loop.

import React, { useState, useCallback } from 'react';

function App() {
  const [showParagraph, setShowParagraph] = useState(false);

  const toggleParagraphHandler = useCallback(() => {
    setShowParagraph((prevShowParagraph) => !prevShowParagraph);
  }, []);
 
  return (
    <div className="app">
      <h1>Hi there!</h1>
      <Button onClick={toggleParagraphHandler}>Toggle Paragraph!</Button>
    </div>
  );
}

export default App;
