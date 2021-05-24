import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import catImg from '../../images/cat_icon.png';
import Typography from '@material-ui/core/Typography';
import qnaboard from '../../db/qna.json';
import { Link } from 'react-router-dom';
import ReadQnA from '../Diagnosis/Content/ReadQnA';
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    alignItems: 'center',
  },
  card: {
    borderColor: 'rgb(131, 131, 131)',
    display: 'flex',
    alignItems: 'center',
    margin: '0 auto',
    marginBottom: '2%',
    paddingRight: '5%',
    width: 'fit-content',
  },
  cover: {
    height: 200,
    width: 200,
  },
  contentWrap: { width: '800px', height: '180px' },
  title: {
    height: '20%',
    verticalAlign: 'middle',
  },
  content: {
    height: '100px',
    verticalAlign: 'middle',
    lineHeight: '100px',
  },
});

export default function QnACards(props) {
  const classes = useStyles();
  const qna = props.post;

  return (
    <div className={classes.root}>
      <Card align="left" className={classes.card} variant="outlined">
        <CardMedia
          className={classes.cover}
          image={catImg}
          title="card_cover"
        />
        <CardContent className={classes.contentWrap}>
          <Grid item className={classes.title}>
            <Link
              to={{
                pathname: `/detailQnA/${qna.identifier}`,
                state: {
                  post_selected_state: qna.state,
                },
              }}
              color="inherit"
            >
              <Typography variant="h6">{qna.title}</Typography>
            </Link>
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography
              noWrap
              variant="body2"
              color="textSecondary"
              className={classes.content}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: qna.content,
                }}
              ></div>
            </Typography>
          </Grid>
          <Grid item className={classes.footer}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm container>
                <Grid item xs={12} sm={10}>
                  <Typography noWrap variant="body2" color="textSecondary">
                    {qna.nickname} / {qna.species}
                  </Typography>
                  {qna.state == 'none' ? (
                    <Typography noWrap variant="subtitle2" color="primary">
                      대기 중
                    </Typography>
                  ) : (
                    <Typography noWrap variant="subtitle2" color="error">
                      채택 완료
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Typography noWrap variant="body1" color="textSecondary">
                    답변 개수 : {qna.answerNum}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
