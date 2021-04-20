import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BoardDetailCard from '../../Card/BoardDetailCard';
import CommentList from '../../Common/CommentList';
import CommentWrite from '../../Common/CommentWrite';
import Header from '../../Common/Header';
const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});
export default function ReadQnA(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <BoardDetailCard />
      <CommentList />
      <CommentWrite />
    </div>
  );
}
