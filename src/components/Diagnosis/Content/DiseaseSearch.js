import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  makeStyles,
  Backdrop,
  Modal,
  Fade,
  Button,
  IconButton,
} from '@material-ui/core';
import DiseaseList from './DiseaseList';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import MapOutlinedIcon from '@material-ui/icons/MapOutlined';
import MapContainer from './MapContainer';
import Icon from '@material-ui/core/Icon';
import { AddAlertRounded, PagesSharp } from '@material-ui/icons';
import item from './DiseaseList';
import TextField from '@material-ui/core/TextField';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  wrap: {},
  search: {
    margin: '0 auto',
    marginTop: '50px',
    width: '60%',
    height: '50px',
  },
  input: {
    width: '85%',
    height: '50px',
    border: '2px solid #dedede',
    borderRadius: '10px',
  },
  icon: {
    pointerEvents: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    height: '46px',
    width: '1.5em',
    opacity: '0.8',
    border: 'none',
    background: 'none',
    color: 'black',
  },
  placeholderStyle: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
  map: {
    overflow: 'auto',
    width: '80%',
  },
  modalBtn: {
    float: 'right',
    paddingTop: '20px',
    paddingBottom: '20px',
    color: 'rgba(0,0,0,.54)',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    width: '60%',
    margin: '0 auto',
    textAlign: 'center',
    marginBottom: '3%',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
  },
  button: {
    margin: theme.spacing(1),
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));
function Contents(props) {
  const ip = process.env.REACT_APP_API_IP;
  const classes = useStyles();
  const [question, setQuestion] = useState('');
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  var [searchResult, setSearchResult] = useState([]);
  const [resultShowState, setResultShowState] = useState('false');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [inputText, setInputText] = useState('');
  const [place, setPlace] = useState('');

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText('');
  };
  const mapModal = (
    <div className={classes.paper}>
      <div>
        <TextField
          id="standard-basic"
          label="장소 검색"
          onChange={onChange}
          value={inputText}
        />
        <Button
          variant="contained"
          className={classes.button}
          color="primary"
          onClick={handleSubmit}
        >
          검색
        </Button>
      </div>
      <MapContainer searchPlace={place} />
    </div>
  );
  const onChangeQuestion = (e) => {
    setQuestion(e.target.value);
  };
  const RequestQuestion = () => {
    if (question == '') {
      alert('증상을 입력해주세요');
    } else {
      const body = {
        content: question,
      };
      console.log(body);
      axios
        .post(ip + '/impression', body)
        .then((res) => {
          setSearchResult(res.data.data.pet_disease_search_info);
          setResultShowState('true');
        })
        .catch((err) => {
          console.log(err);
          alert('검색 실패');
        });
    }
  };
  useEffect(() => {
    console.log(searchResult);
  }, [searchResult]);
  return (
    <Container className={classes.wrap}>
      <div className={classes.search}>
        <InputBase
          className={classes.input}
          placeholder="동물의 증상을 입력해주세요"
          classes={{
            input: classes.placeholderStyle,
          }}
          inputProps={{ 'aria-label': 'search' }}
          onChange={onChangeQuestion}
        />

        <IconButton aria-label="serach" onClick={RequestQuestion}>
          <SearchIcon className={classes.icon} />
        </IconButton>
      </div>

      <div className={classes.map}>
        <Button className={classes.modalBtn} onClick={handleOpen}>
          <MapOutlinedIcon style={{ fontSize: 35 }} />
          <strong>인근 병원 찾기</strong>
        </Button>
      </div>
      <Modal open={open} onClose={handleClose}>
        {mapModal}
      </Modal>
      {resultShowState == 'true' && <DiseaseList list={searchResult} />}
    </Container>
  );
}

export default Contents;
