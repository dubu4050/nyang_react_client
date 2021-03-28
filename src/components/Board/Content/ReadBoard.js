import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DetailCard from '../../Diagnosis/Content/DetailCard';
import ReviewList from '../../Common/ReviewList';
import ReviewWrite from '../../Common/ReviewWrite';
import Header from '../../Common/Header';
const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});
export default function ReadBoard(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <DetailCard />
      <ReviewList />
      <ReviewWrite />
    </div>
  );
}
