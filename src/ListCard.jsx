import React, {useContext} from 'react';
import DataContext from './DataContext.jsx';
import { ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';


export default function AlignItemsList({ item }) {
  const data = useContext(DataContext);

  function handleAdd(item) {
    data.seed[item.type].push(item);
    data.seedStack.push(item);
    if (data.seedStack.length > 5) {
      let removeType = data.seedStack[0].type;
      data.seed[removeType].shift();
      data.seedStack.shift();
    }
    data.setSeed(Object.assign({}, data.seed));
    data.setSeedStack(Array.from(data.seedStack))
  }

  return (
    <ListItem button alignItems="flex-start" onClick={() => handleAdd(item)}>
      <ListItemAvatar>
        <Avatar alt={item.name} src={item.images && item.images[2] ? item.images[2].url : null} />
      </ListItemAvatar>
      <ListItemText
        primary={item.name}
        secondary={item.artists ? item.artists.map((artist, i, artists) => i === artists.length - 1 ? `${artist.name}` : `${artist.name}, `) : null}
      />
    </ListItem>
  );
}