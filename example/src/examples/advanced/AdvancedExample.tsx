import React from 'react';
import useSelection, { pivotReducer, PivotReducerState, UseSelectionApiReducerActions } from "react-selection-hooks";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Container, Typography, Paper, Box, ListSubheader, makeStyles, ListItemSecondaryAction, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  pivot: {
    border: `1px solid ${theme.palette.primary.main}`
  },
  subheader: {
    paddingTop: theme.spacing(2)
  },
  selectionCount: {
    marginLeft: theme.spacing(2),
    color: theme.palette.primary.main
  },
  selectedCountEnforced: {
    marginLeft: theme.spacing(2),
    color: theme.palette.secondary.main
  }
}))

interface Item {
    key: string;
}

// for best performance getKey should be wrapped in `useCallback` or declared out of the render body
const getKey = (item: Item) => item.key;
const items: Item[] = Array.from({ length: 20 }).map((_, i) => ({ key: `Item${i}` }));

const MAX_ITEMS = 5;
const maxItemsReducer = (state: PivotReducerState<Item>, action: UseSelectionApiReducerActions<Item>) => {
  const newState = pivotReducer(state, action);

  if (newState.selectedItems.length > MAX_ITEMS) {
    return {
      ...state,
      didEnforceLimit: true
    }
  }

  return {
    ...newState,
    didEnforceLimit: false
  }
};

type ReducerState = PivotReducerState<Item> & { didEnforceLimit: boolean }

const AdvancedExample = () => {
    const classes = useStyles();
    const { removeFromSelection, clearSelection, selectionCount, onSelect, isSelected, state: { pivotKey, didEnforceLimit } } = useSelection<Item, ReducerState>(items, {
      getKey,
      reducer: maxItemsReducer
    });
    return (
    <Container>
        <Typography variant="body1">
          Regular click to select a single item
        </Typography>
        <Typography variant="body1">
          Shift click to add a range of items to selection using previous pivot point
        </Typography>
        <Typography variant="body1">
          Ctrl/CMD click to add/remove an item from the current selection
        </Typography>
        <Paper variant="outlined">
          <Box paddingLeft={2} paddingRight={2}>
            <List disablePadding>
              <ListSubheader className={classes.subheader}>
                <ListItemText>
                  <Typography component="span">
                    Select some items!
                  </Typography>
                  <Typography variant="body2" component="span" className={didEnforceLimit ? classes.selectedCountEnforced : classes.selectionCount}>
                    ({selectionCount}/{MAX_ITEMS} selected)
                  </Typography>
                </ListItemText>
                <ListItemSecondaryAction>
                  <Button variant="outlined" size="small" onClick={() => clearSelection()}>
                    Clear
                  </Button>
                </ListItemSecondaryAction>
              </ListSubheader>
            {
              items.map(i => (
                <ListItem
                  button
                  selected={isSelected(i)}
                  key={i.key}
                  onClick={e => onSelect(i, e)}
                  divider
                  className={pivotKey === i.key ? classes.pivot : undefined}
                >
                  <ListItemText primary={i.key} />
                  <ListItemSecondaryAction>
                    <Button color="secondary" size="small" onClick={() => removeFromSelection(i)}>Remove</Button>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            }
            </List>
          </Box>
        </Paper>
      </Container>
    );
}

export default AdvancedExample;