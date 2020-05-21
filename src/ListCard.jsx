import React, { useContext } from 'react';
import DataContext from './DataContext.jsx';
import { ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';


export default function ListCard({ item, clickable }) {
  const { seed, setSeed, seedStack, setSeedStack } = useContext(DataContext);

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
    <ListItem button={clickable} alignItems="flex-start" onClick={() => { clickable ? handleAdd(item) : null }}>
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