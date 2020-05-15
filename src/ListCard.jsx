import React from 'react';
import {ListItem, ListItemText, ListItemAvatar, Avatar} from '@material-ui/core';


export default function AlignItemsList() {

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="name" src="https://i.scdn.co/image/053191e73733c0c9d081859fdab2d9171e2905c3" />
      </ListItemAvatar>
      <ListItemText
        primary="Test & Recognise - Flume Re-work"
        secondary={
          "Seekae, Flume"
        }
      />
    </ListItem>
  );
}