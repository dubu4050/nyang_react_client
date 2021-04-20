import React from 'react';
import dummy from '../../db/review.json';
import { makeStyles } from '@material-ui/core/styles';
import CommentCard from '../Card/CommentCard';
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    borderTop: '0.8px solid #dedede',
    '@media (min-device-width: 481px)': {
      // PC
      marginTop: '30px',
    },
    '@media (min-device-width: 320px) and (max-device-width: 480px)': {
      // Mobile
      marginTop: '15px',
    },
  },
  count: {
    overflow: 'auto',
    width: '70%',
    margin: '0 auto',
    padding: '15px 0px 15px 0px',
  },
});

export default function ComplexGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.count}>
        <strong>답변 </strong>
        <strong>3</strong>
      </div>
      <CommentCard />
      <CommentCard />
    </div>
  );
}
