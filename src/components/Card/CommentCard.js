import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IU from '../../images/IU.jpg';

const useStyles = makeStyles({
  root: {
    alignItems: 'center',
  },
  card: {
    borderColor: 'rgb(131, 131, 131)',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2%',
    border: '1px solid',
    borderRadius: '25px',
    paddingLeft: '0.5%',
    paddingRight: '0.5%',
  },
  cover: {
    height: '7em',
    width: '7em',
    border: '1px solid',
    borderRadius: '25%',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nickname: {
    fontSize: '1.4em',
  },
  date: {
    fontSize: '1em',
  },
  content: {
    minHeight: '3em',
  },
  contentWrapper: {
    width: '100%',
  },
});

export default function commentCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <div>
        <CardMedia
          className={classes.cover}
          image={IU}
          title="Live from space album cover"
        />
      </div>
      <div className={classes.contentWrapper}>
        <CardContent>
          <div className={classes.title}>
            <Typography className={classes.nickname}>dubu4050</Typography>
            <Typography className={classes.date}>2021.02.23</Typography>
          </div>
          <div className={classes.content}>
            <Typography variant="body2" color="textSecondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
