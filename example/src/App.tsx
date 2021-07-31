import React from 'react';
import './App.css';
import useSelection from "react-selection-hooks";

interface Item {
  key: string;
}
const items: Item[] = [{ key: 'Item 1' }, { key: 'Item 2' }, { key: 'Item3' }, { key: 'Item4' }];

function App() {
  const [onToggle, selection] = useSelection<Item>(item => item.key)
  return (
    <div className="App">
      {
        items.map(i => (
            <button key={i.key} onClick={() => onToggle(i)}>
              {`${i.key}${selection[i.key] ? ' - selected' : ''}`}
            </button>
        ))
      }
    </div>
  );
}

export default App;