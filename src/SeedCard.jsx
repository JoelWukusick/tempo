import React from 'react';
import { Paper, GridListTile, Card, CardMedia, CardContent, Typography, Button, CardActions, CardActionArea, FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({

  tile: {
    width: '100%',
  },
  image: {
    maxWidth: '100%'
  }
}))

export default function ItemCard({ images, name }) {
  console.log('images ', images, 'name ', name)
  const classes = useStyles();

  return (
    // <Card key={name}>
    //   <CardActionArea >
    //     <CardMedia
    //       className={classes.cardMedia}
    //       image={images && images[2] ? images[2].url : null} />
    //     <CardContent className={classes.hidden}>
    //     </CardContent>
    //   </CardActionArea>
    // </Card>
    <GridListTile className={classes.tile}>
      <img className={classes.image} src={images && images[2] ? images[2].url : null} />
    </GridListTile>
  )
}