import React from 'react';
import useSelection, { PivotReducerState } from "react-selection-hooks";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Container, Typography, Paper, Box, ListSubheader, makeStyles, Button, ListItemSecondaryAction } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  pivot: {
    border: `1px solid ${theme.palette.primary.main}`
  },
  subheader: {
    paddingTop: theme.spacing(2)
  },
  selectionCount: {
    marginLeft: theme.spacing(2),
  },
}))

interface Item {
    key: string;
}

// for best performance getKey should be wrapped in `useCallback` or declared out of the render body
const getKey = (item: Item) => item.key;
const items: Item[] = Array.from({ length: 20 }).map((_, i) => ({ key: `Item${i}` }));
const BasicExample = () => {
    const classes = useStyles();
    const { onSelect, isSelected, state, selectionCount, selectAll, clearSelection } = useSelection<Item, PivotReducerState<Item>>(items, {
      getKey
    });
    return (
    <Container>
        <Typography variant="body1">
          Regular click to selection a single item
        </Typography>
        <Typography variant="body1">
          Shift click to add a range of items to selection using previous pivot point
        </Typography>
        <Typography variant="body1">
          Ctrl click to add/remove an item from the current selection
        </Typography>
        <Paper variant="outlined">
          <Box paddingLeft={2} paddingRight={2}>
            <List disablePadding>
            <ListSubheader className={classes.subheader}>
                <ListItemText>
                  <Typography component="span">
                    Select some items!
                  </Typography>
                  <Typography variant="body2" component="span" className={classes.selectionCount}>
                    ({selectionCount} selected)
                  </Typography>
                </ListItemText>
                <ListItemSecondaryAction>
                <Button variant="outlined" size="small" onClick={() => selectAll()}>
                    All
                  </Button>
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
                  className={state.pivotKey === i.key ? classes.pivot : undefined}
                >
                  <ListItemText primary={i.key} />
                </ListItem>
              ))
            }
            </List>
          </Box>
        </Paper>
      </Container>
    );
}

export default BasicExample;