
import React from 'react';
import { } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  aspectRatioContainer: {
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
    cursor: 'pointer',
    width: '100%',
    height: '100%',
    position: 'absolute',
    textAlign: 'center',
    objectFit: 'cover',
    color: 'transparent',
    textIndent: 10000
  },
  deleteIcon: {
    color: theme.palette.primary.contrastText,
    position: 'absolute',
    [theme.breakpoints.down('xs')]: {
      fontSize: '18px',
      top: -9,
      right: -9
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '24px',
      top: -12,
      right: -12
    },
    boxSizing: 'border-box',
    zIndex: 1,
  },
}))

export default function SeedImage({ images, name }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <HighlightOffIcon className={classes.deleteIcon} />
      <div className={classes.aspectRatioContainer}>
        <img className={classes.image} src={images && images[2] ? images[2].url : null} />
      </div>
    </div>
  )
}