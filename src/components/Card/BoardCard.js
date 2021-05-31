import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

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
    paddingRight: '2%',
    width: 'fit-content',
  },
  contentWrap: {
    width: '1000px',
    paddingLeft: '2%',
    paddingBottom: '0',
  },
  titlewrap: {
    height: '20%',
    verticalAlign: 'middle',
    paddingLeft: '2%',
  },
  title: {
    color: '#48484d',
    fontWeight: 'bold',
    fontSize: '22px',
  },
  content: {
    verticalAlign: 'middle',
    paddingLeft: '3%',
    paddingTop: '2%',
    paddingBottom: '1%',
    fontSize: '18px',
  },
  img: { width: '40px' },
  footer: { display: 'flex' },
  writer: { width: '85%' },
  comment: {
    fontWeight: 'bold',
    padding: '16px',
    alignItems: 'center',
    verticalAlign: 'middle',
    paddingBlockStart: '30px',
  },
});

export default function BoradCards(props) {
  const classes = useStyles();
  const tempValue = props.list;
  console.log(tempValue);
  var [contentHtml] = useState([]);
  tempValue.forEach((element) => {
    contentHtml[element.identifier] = element.summary;
  });
  return (
    <div className={classes.root}>
      {props.list.map((qna) => (
        <Card align="left" className={classes.card} variant="outlined">
          <CardContent
            className={classes.contentWrap}
            style={{ paddingBottom: '0' }}
          >
            <Grid item className={classes.titlewrap}>
              <Link
                to={{
                  pathname: `/detailBoard/${qna.identifier}`,
                  state: {
                    post_selected_state: qna.state,
                  },
                }}
                color="inherit"
                style={{
                  textDecoration: 'none',
                }}
              >
                <Typography variant="h6" className={classes.title}>
                  {qna.title}
                </Typography>
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
                    __html: contentHtml[qna.identifier],
                  }}
                ></div>
              </Typography>
            </Grid>

            <Grid item className={classes.footer}>
              <CardHeader
                className={classes.writer}
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    <img src={qna.profile_photo_path} className={classes.img} />
                  </Avatar>
                }
                title={qna.nickname}
              ></CardHeader>
              <Typography
                color="primary"
                className={classes.comment}
                align="center"
              >
                답변 개수 : {qna.commentNum}
              </Typography>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
