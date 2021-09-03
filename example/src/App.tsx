import React from 'react';
import Example from './Example';
import basicExampleText from './examples/Basic/basic-example-text';
import advancedExampleText from './examples/advanced/advanced-example-text';
import BasicExample from './examples/Basic/BasicExample';
import AdvancedExample from './examples/advanced/AdvancedExample';
import { Typography, Container } from '@material-ui/core';

const App = () => {

  return (
    <div className="App">
      <Container>
        <Typography variant="h1">
          react-selection-hooks
        </Typography>
        <Example text={basicExampleText} title="Basic Example">
        <BasicExample />
      </Example>
      <Example text={advancedExampleText} title="Advanced Example">
        <AdvancedExample />
      </Example>
    </Container>
    </div>
  );
}

export default App;
