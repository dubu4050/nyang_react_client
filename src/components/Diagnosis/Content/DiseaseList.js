import React from 'react';
import dummy from '../../../db/disease.json';
import {
  Card,
  makeStyles,
  Table,
  TableBody,
  CardActions,
  CardContent,
  Button,
  Typography,
  Badge,
  MuiThemeProvider,
  createMuiTheme,
  Fab,
  IconButton,
  Collapse,
} from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Link } from 'react-scroll';
import clsx from 'clsx';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  table: {
    width: '50%',
    margin: '0 auto',
    borderBottom: 'none',
  },
  index: {
    height: '55px',
    textAlign: 'center',
    borderBottom: 'none',
  },
  circle: {
    width: '45px',
    height: '30px',
    borderRadius: '75px',
    backgroundColor: 'rgb(0,0,0,0.25)',
    display: 'table-cell',
    textAlign: 'center',
    verticalAlign: 'middle',
    color: 'white',
    fontWeight: 'bold',
  },
  name: {
    fontWeight: '600',
    borderBottom: 'none',
    height: '20%',
    paddingBottom: 0,
  },
  explan: {
    fontWeight: '400',
    borderBottom: 'none',
    paddingTop: '10px',
  },
  alert: {
    margin: '0 auto',
    marginTop: '50px',
    width: 'fit-content',
    display: 'flex',
    marginBottom: '50px',
  },
  alertImg: {
    width: '45px',
    height: '45px',
    opacity: '0.8',
    marginRight: '20px',
    marginTop: '10px',
    verticalAlign: 'middle',
  },
  alertmessage: {
    fontWeight: '600',
  },
  cardWrap: {
    borderTop: '1px solid rgb(0,0,0,0.25)',
  },
  cardId: {
    margin: '0 auto',
    marginTop: '100px',
  },
  card: {
    minWidth: 275,
    marginTop: '20px',
    borderRadius: '20px',
    padding: '10px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: '20px',
    fontWeight: '600',
  },
  pos: {
    marginBottom: 12,
  },
}));

function DiseaseList(props) {
  const classes = useStyles();
  const theme = createMuiTheme({
    palette: {
      secondary: { main: 'rgb(0,0,0,0.25)' },
      primary: { main: '#49D7F0', contrastText: 'white' },
    },
  });
  const [open, setOpen] = React.useState(true);

  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <Table className={classes.table}>
          {props.list.map((resultData) => (
            <TableBody>
              <TableRow>
                <TableCell className={classes.index} rowspan="2">
                  <Badge color="secondary" badgeContent={resultData.no}></Badge>
                </TableCell>
                <TableCell className={classes.name}>
                  {resultData.answer_ner}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.explan} colspan="2">
                  {' '}
                  <Link to={resultData.title} smooth={true} duration={500}>
                    {resultData.sentence_info}
                  </Link>
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>

        <div className={classes.alert}>
          <Collapse in={open}>
            <Alert
              variant="outlined"
              severity="warning"
              color="warning"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              본 진단결과는 실제 진단 결과와 상이할 수 있습니다.
              <br />
              <strong>
                정확한 진단을 위해서는 병원을 내방하시어 진료받으시기를
                권장합니다.
              </strong>
            </Alert>
          </Collapse>
        </div>

        <div className={classes.cardWrap}>
          {props.list.map((resultData) => (
            <div className={classes.cardId} id={resultData.no}>
              <Badge color="secondary" badgeContent={resultData.no}></Badge>
              <Card className={classes.card} variant="outlined">
                <CardContent>
                  <Typography
                    className={classes.title}
                    variant="h1"
                    gutterBottom
                  >
                    {resultData.title}
                  </Typography>
                  {/* <Typography className={classes.pos}>
                    {disease.writer}
                  </Typography> */}
                  <Typography variant="h5" component="h2">
                    Q
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {resultData.question}
                  </Typography>
                  <br />
                  <hr />
                  <Typography variant="h5" component="h2">
                    {' '}
                    A
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {resultData.answer}
                  </Typography>
                  {/* <Typography className={classes.pos}>
                    {disease.doctor}
                  </Typography> */}
                </CardContent>
                <CardActions>
                  {/* <Button size="small">더보기</Button> */}
                  <Button
                    size="small"
                    onClick={() => window.open(resultData.url, '_blank')}
                  >
                    더보기
                  </Button>
                </CardActions>
              </Card>
            </div>
          ))}
        </div>
      </MuiThemeProvider>
    </div>
  );
}
export default DiseaseList;
