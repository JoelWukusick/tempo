import React, { useState } from 'react';
import { Tooltip, ClickAwayListener, Typography } from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

export default function TooltipMobile({ title }) {
  const [open, setOpen] = React.useState(false);

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
          <HelpOutlineIcon onClick={() => setOpen(true)} fontSize='small' />
        </Tooltip>
      </Typography >
    </ClickAwayListener >
  )
}

