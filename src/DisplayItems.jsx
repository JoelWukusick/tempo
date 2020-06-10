import React from 'react';
import GridCard from './GridCard.jsx';
import ListCard from './ListCard.jsx';
import { Grid, List, Box, useMediaQuery } from '@material-ui/core';
import theme from './theme.jsx';

export default function DisplayItems({ items, clickable }) {
  const mobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Box pb='24vh' pt={1}>
      {!mobile ?
        <Box py={2}>
          <Grid container spacing={2}>
            {items.map(item => (
              <GridCard item={item} clickable={clickable} />
            ))}
          </Grid>
        </Box> :
        <List>

          {items.map(item => (
            <ListCard item={item} clickable={clickable} />
          ))}
        </List>
      }
    </Box >
  )
}






