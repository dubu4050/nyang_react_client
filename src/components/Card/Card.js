import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import catImg from '../../img/cat_icon.png';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    alignItems: 'center',
  },
  card: {
    borderColor: 'rgb(131, 131, 131)',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2%',
  },
  cover: {
    height: 200,
    width: 200,
  },
});

export default function Cards(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Card align="left" className={classes.card} variant="outlined">
        <CardMedia
          className={classes.cover}
          image={catImg}
          title="card_cover"
        />
        <CardContent>
          <Typography gutterBottom variant="h5">
            Lizard
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
