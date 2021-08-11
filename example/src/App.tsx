import React from 'react';
import './App.css';
import useSelection from "react-selection-hooks";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

interface Item {
  key: string;
}
const items: Item[] = [{ key: 'Item 1' }, { key: 'Item 2' }, { key: 'Item3' }, { key: 'Item4' }];

function App() {
  const [onSelect, selection] = useSelection<Item>(items, (item: Item) => item.key)
  return (
    <div className="App">
      <List>
      {
        items.map(i => (
          <ListItem
            button
            selected={!!selection[i.key]}
            key={i.key}
            onClick={e => onSelect(i, e)}
            divider
          >
            <ListItemText primary={i.key} />
          </ListItem>
        ))
      }
      </List>
    </div>
  );
}

export default App;
