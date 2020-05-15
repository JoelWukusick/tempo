import React from 'react';
import SearchForm from './SearchForm.jsx';
import { List, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BottomNav from './BottomNav.jsx';
import ListCard from './ListCard.jsx';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    marginLeft: 0

  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(10),
    right: theme.spacing(2),
  },

}));

export default function Search() {
  const classes = useStyles();

  return (
    <>
      <SearchForm />
      <Paper className={classes.paper} >
        <List>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(value => (
            <ListCard />
          ))}
        </List>
      </Paper>

      <BottomNav />
    </>
  )
}

// export default Search;