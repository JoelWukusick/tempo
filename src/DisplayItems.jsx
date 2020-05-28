import React from 'react';
import GridCard from './GridCard.jsx';
import ListCard from './ListCard.jsx';
import { Grid, List, Box, useMediaQuery } from '@material-ui/core';
import theme from './theme.js';

export default function DisplayItems({ items, clickable }) {
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Box pb='22vh'>
      {!mobile ?
        <Grid container spacing={4}>
          {items.map(item => (
            <GridCard item={item} clickable={clickable} />
          ))}
        </Grid> :
        <List>
          {items.map(item => (
            <ListCard item={item} clickable={clickable} />
          ))}
        </List>
      }
    </Box>
  )
}






