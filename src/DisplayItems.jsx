import React from 'react';
import GridCard from './GridCard.jsx';
import ListCard from './ListCard.jsx';
import { Grid, List, Box } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import theme from './theme.js';


export default function DisplayItems({ items, clickable }) {
  const smallScreen = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box pb='22vh'>
      {smallScreen ?
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






