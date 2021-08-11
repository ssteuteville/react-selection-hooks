# react-selection-hooks
Our operating systems use click modifiers to make our lives easier when selecting things and so should our react apps! This project aims to build abstractions around managing a selection of items from an array. The project's initial goal is to build a few different sets of behaviors that are based on how popular operating systems handle mouse modifiers and to expose an api to help manage and use the selection throughout your UI. From there, a customization api will be added to allow fine-tuning or completely overriding how the selection behaviors work.

## Installation
### yarn
`yarn add react-selection-hooks`

### npm
`npm install --save react-selection-hooks`

## Demo
https://ssteuteville.github.io/react-selection-hooks/


## Basic Usage (default behavior is based on chromeOS)
```
    const items = Array.from({ length: 20 }).map((_, i) => ({ key: `Item${i}` }));
    const { onSelect, selectionState } = useSelection(items, (item) => item.key)
    return (
    <List disablePadding>
    {
        items.map(i => (
        <ListItem
            button
            selected={!!selectionState[i.key]}
            key={i.key}
            onClick={e => onSelect(i, e)}
            divider
        >
            <ListItemText primary={i.key} />
        </ListItem>
        ))
    }
    </List>
    );
```

## Up Next
1. reset()
2. selectionCount
3. isSelected(item)
4. selectedItems
5. context api support
6. customization api