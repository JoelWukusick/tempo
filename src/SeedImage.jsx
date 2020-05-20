
import React from 'react';
import { } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    paddingBottom: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '2px',
    overflow: 'hidden',
    userSelect: 'none',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    textAlign: 'center',
    objectFit: 'cover',
    color: 'transparent',
    textIndent: 10000
  }
}))

export default function SeedImage({ images, name }) {
  console.log('images ', images, 'name ', name)
  const classes = useStyles();

  return (

    <div className={classes.root}>
      <img className={classes.image} src={images && images[2] ? images[2].url : null} />
    </div>
  )
}