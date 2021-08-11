import React from 'react';
import useSelection from "react-selection-hooks";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Container, Typography, Paper, Box, ListSubheader } from '@material-ui/core';

interface Item {
    key: string;
}
const items: Item[] = Array.from({ length: 20 }).map((_, i) => ({ key: `Item${i}` }));
const BasicExample = () => {
    const { onSelect, isSelected } = useSelection<Item>(items, (item: Item) => item.key)
    return (
    <Container>
        <Typography variant="h2">
          react-selection-hooks
        </Typography>
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
              <ListSubheader>
                Select some items!
              </ListSubheader>
            {
              items.map(i => (
                <ListItem
                  button
                  selected={isSelected(i)}
                  key={i.key}
                  onClick={e => onSelect(i, e)}
                  divider
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