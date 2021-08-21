
![npmdownloads](https://img.shields.io/npm/dm/react-selection-hooks)

![npmversion](https://img.shields.io/npm/v/react-selection-hooks)

![npmuserstars](https://img.shields.io/github/stars/ssteuteville?label=ssteutevile&style=social)

# react-selection-hooks
Our operating systems use click modifiers to make our lives easier when selecting things and so should our react apps! This project aims to build abstractions around managing a selection of items from an array.

## Goals
- Easy to use, no configuration, and useful default click modifiers
- Customizable click handling (wip)
- API for handling most common selection state actions (clear, append, remove, etc)
- Mobile utilities (not started)
- High unit test coverage (not started)
- Ability to maintain selections while filtering (not started)

## Installation
### yarn
`yarn add react-selection-hooks`

### npm
`npm install --save react-selection-hooks`

### Peer dependencies:
"react": "^17.0.2", "react-dom": "^17.0.2" 

## Demo
https://ssteuteville.github.io/react-selection-hooks/

## Features
- Easy to use Operating System Like Selection functionality
- Selection State management and utilities
- Pivot Mode (default, matches popular operating systems)
- Customizability API (create your own state reducer)
- Built-in typescript support

## Usage
```ts
import React from 'react';
import useSelection from 'react-selection-hooks';

const items = Array.from({ length: 10 })
  .map((_, i) => ({ key: `Key ${i}` }));

const getKey = item => item.key;

const MyComponent: React.FC = () => {
  const { 
    // an array of selected items
    selectedItems,
    // the number of items selected
    selectionCount,
    // add one item to the selection
    appendSelection, 
    // remove all items from selection
    clearSelection,
    // check if item is selected
    isSelected,
    // (item, mouseEvent) => void, mouse event handler with modifier support
    onSelect,
    // remove one item from selection
    removeFromSelection,
    // toggle whether an item is selected or not
    toggleSelection
    // useSelection has optional `reducer` and `defaultState` parameters
  } = useSelection(items, { getKey });

  return (
    <ul>
      {
        items.map(item => (
          <li 
            key={item.key}
            onClick={e => onSelect(item, e)}
            style={{ border: isSelected(item) ? '1px solid blue' : undefined }}
          >
            {item.key}
          </li>
        )
      }
    </ul>
  )
}
```

## Coming Soon
- More click handling modes (currently defaults to windows/chromeos, macos will be next)
- A base reducer to use for building custom reducers
- Mobile features
- Better Documentation
- Better test coverage

## Contributions
Currently just asking for ideas for a long-term api and opinions on usefulness/interest

Use this issue if you're interested:
https://github.com/ssteuteville/react-selection-hooks/issues/1