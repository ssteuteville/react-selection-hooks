import React from 'react';
import Example from './Example';
import basicExampleText from './examples/Basic/basic-example-text';
import BasicExample from './examples/Basic/BasicExample';

const App = () => {

  return (
    <div className="App">
      <Example text={basicExampleText}>
        <BasicExample />
      </Example>
    </div>
  );
}

export default App;
