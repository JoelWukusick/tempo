import React, { useContext } from 'react';
import DataContext from './DataContext.jsx';
import { Grid, Card, CardContent, CardActionArea, CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px'
  },
  cardMedia: {
    verticalAlign: 'top',
    paddingTop: '50%'
  },
  stretch: {
    verticalAlign: 'top',
    flexGrow: 1,
  },
  text: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  },
  title: {
    fontSize: '14px'
  },
  artist: {
    fontSize: '12px'
  }
}))

export default function GridCard({ item, clickable }) {
  const classes = useStyles();
  const { seed, setSeed, seedStack, setSeedStack } = useContext(DataContext);
  const card = (
    <>
      <CardMedia
        className={classes.cardMedia}
        image={item.images && item.images[1] ? item.images[1].url : null} />
      <CardContent >
        <Typography className={`${classes.text} ${classes.title}`} variant='h6' >
          {item.name}
        </Typography>
        <Typography className={`${classes.text} ${classes.artist}`} >
          {item.artists ? item.artists.map((artist, i, artists) => i === artists.length - 1 ? `${artist.name}` : `${artist.name}, `) : null}
        </Typography>
      </CardContent>
    </>);

  function handleAdd(item) {
    seed[item.type].push(item);
    seedStack.push(item);
    if (seedStack.length > 5) {
      let removeType = seedStack[0].type;
      seed[removeType].shift();
      seedStack.shift();
    }
    setSeed(Object.assign({}, seed));
    setSeedStack(Array.from(seedStack))
  }

  return (
    <Grid item sm={4} md={3}>
      <Card className={classes.card} key={item.name} raised={false} onClick={() => { clickable ? handleAdd(item) : null }}>
        <div className={classes.stretch}>
          {clickable ?
            <CardActionArea className={classes.actionArea}>
              {card}
            </CardActionArea> :
            card
          }
        </div>
      </Card>
    </Grid>

  );
}