import React, { useState } from 'react';
import { Tooltip, ClickAwayListener, Typography } from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.disabled,
    marginLeft: theme.spacing(1)
  }
}));

export default function TooltipMobile({ title }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Typography display='inline' color='textSecondary'>
        <Tooltip
          placement='top'
          arrow
          PopperProps={{
            disablePortal: true,
          }}
          onClose={() => setOpen(false)}
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={title}
        >
          <HelpOutlineIcon className={classes.icon} onClick={() => setOpen(true)} fontSize='small' />
        </Tooltip>
      </Typography >
    </ClickAwayListener >
  )
}

