
![npmdownloads](https://img.shields.io/npm/dm/react-selection-hooks)

![npmversion](https://img.shields.io/npm/v/react-selection-hooks)

![npmuserstars](https://img.shields.io/github/stars/ssteuteville?label=ssteutevile&style=social)

# react-selection-hooks
Our operating systems use click modifiers to make our lives easier when selecting things and so should our react apps! This project aims to build abstractions around managing a selection of items from an array. The project's initial goal is to build a few different sets of behaviors that are based on how popular operating systems handle mouse modifiers and to expose an api to help manage and use the selection throughout your UI. From there, a customization api will be added to allow fine-tuning or completely overriding how the selection behaviors work.

## Installation
### yarn
`yarn add react-selection-hooks`

### npm
`npm install --save react-selection-hooks`

### Peer dependencies:
"react": "^17.0.2"
"react-dom": "^17.0.2" 

## Demo
https://ssteuteville.github.io/react-selection-hooks/

## Usage

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
	    } = useSelection(items, getKey);
		return (
			<ul>
				{
					items.map(item => (
						<li key={item.key} onClick={e => onSelect(item, e)}>{item.key}</li>
					)
				}
			</ul>
		)
    }

## Contributions
Currently just asking for ideas for a long-term api and opinions on usefulness/interest

Use this issue if you're interested:
https://github.com/ssteuteville/react-selection-hooks/issues/1