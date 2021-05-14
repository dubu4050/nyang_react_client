import React, { useState, createRef } from 'react';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import Header from '../../Common/Header';
import {
  Container,
  withStyles,
  Button,
  ThemeProvider,
  createMuiTheme,
  TextField,
  FormLabel,
  makeStyles,
} from '@material-ui/core';
import axios from 'axios';
import editor from '@toast-ui/editor';

//종, 품종, 나이, 제목, 게시글 전역 변수 지정
var { genus } = '';
var { species } = '';
var { age } = '';
var { title } = '';
var { content } = '';
var { qnaNo } = '';
const useStyles = makeStyles((theme) => ({
  wrap: {
    marginTop: '3%',
    width: '70%',
  },
  infoWrap: { borderBottom: '0.5px solid #aaaaaa' },
  listTilte: { width: '100%', borderBottom: '0.5px solid #aaaaaa' },
  formLabel: { marginBottom: '1%' },
  fieldControl: {
    display: 'inherit',
    marginTop: '2%',
    marginBottom: '2%',
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  underline: {
    height: '40px',
    marginBottom: '3%',
  },
  genus: { width: '30%' },
}));

const genuses = [
  {
    value: '선택',
    label: '선택',
  },
  {
    value: '강아지',
    label: '강아지',
  },
  {
    value: '고양이',
    label: '고양이',
  },
  {
    value: '고슴도치',
    label: '고슴도치',
  },
  {
    value: '기타',
    label: '기타',
  },
];

function QnAModify(props) {
  const classes = useStyles();
  const theme = createMuiTheme({
    palette: {
      primary: { main: '#666' },
    },
  });
  console.log(props.location.state);
  title = props.location.state.title;
  species = props.location.state.species;
  content = props.location.state.question;
  age = props.location.state.age;
  qnaNo = props.location.state.no;
  return (
    <ThemeProvider theme={theme}>
      <Container className={classes.wrap}>
        <FunComp />
        <EditComp></EditComp>
      </Container>
    </ThemeProvider>
  );
}

function FunComp(props) {
  const classes = useStyles();

  const onChangeGenus = (e) => {
    genus = e.target.value;
  };
  const onChangeSpecies = (e) => {
    species = e.target.value;
  };
  const onChangeAge = (e) => {
    age = e.target.value;
  };
  return (
    <div className={classes.infoWrap}>
      <div className={classes.listTilte}>
        <h3>질문하기</h3>
      </div>
      <form className={classes.fieldControl} noValidate autoComplete="off">
        <FormLabel component="legend" className={classes.formLabel}>
          반려동물 정보
        </FormLabel>
        <TextField
          id="genus"
          select
          label="종"
          size="small"
          value={genus}
          onChange={onChangeGenus}
          className={classes.genus}
          SelectProps={{
            native: true,
          }}
          InputProps={{
            classes: {
              underline: classes.underline,
            },
          }}
          variant="outlined"
        >
          {genuses.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <br />
        <TextField
          id="species"
          label="품종"
          size="small"
          defaultValue={species}
          variant="outlined"
          onChange={onChangeSpecies}
        />
        <TextField
          type="number"
          label="나이"
          defaultValue={age}
          InputProps={{ inputProps: { min: 0, max: 99 } }}
          size="small"
          variant="outlined"
          onChange={onChangeAge}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
    </div>
  );
}

class EditComp extends React.Component {
  editorRef = React.createRef();
  constructor() {
    super();
    this.state = {
      content: '',
      selectedValue: 'a',
    };
  }

  render() {
    const classes = {
      title: {
        marginTop: '2%',
        marginBottom: '2%',
        width: '100%',
      },
      btnbox: {
        width: '100%',
        height: 'fit-content',
        textAlign: 'center',
      },
      okbtn: {
        width: '200px',
        height: '50px',
        color: 'white',
        background: '#49D7F0',
        marginTop: '20px',
        fontWeight: 'bold',
      },
      canclebtn: {
        width: '200px',
        height: '50px',
        color: 'white',
        background: '#B7B7B7',
        marginTop: '20px',
        marginInlineEnd: '10%',
        fontWeight: 'bold',
      },
    };
    const onChangeTitle = (e) => {
      title = e.target.value;
    };

    const modifyQnaBoard = () => {
      if (
        genus == undefined ||
        species == '' ||
        age == '' ||
        title == '' ||
        content == ''
      ) {
        alert('모든 항목 채우지 않았습니다.');
      } else {
        if (age >= 100) {
          alert('나이가 그렇게 많나요?');
        } else {
          alert('게시글 수정 요청');
          console.log(genus);
          console.log(species);
          console.log(age);
          console.log(title);
          console.log(this.editorRef.current.getInstance().getHtml());
          const body = {
            genus: genus,
            species: species,
            age: age,
            title: title,
            content: this.editorRef.current.getInstance().getHtml(),
          };
          console.log(body);
          // axios
          //   .put(ip + '/question' + '/qnaNo', body)
          //   .then((res) => {
          //     alert('글 등록에 성공했습니다.');
          //   })
          //   .catch((err) => {
          //     alert('글 등록에 실패했습니다.');
          //   });
        }
      }
    };
    return (
      <div>
        <TextField
          id="title"
          variant="outlined"
          size="small"
          style={classes.title}
          defaultValue={title}
          placeholder="제목을 입력하세요"
          onChange={onChangeTitle}
          InputProps={{
            classes: {
              underline: classes.underline,
            },
          }}
        />
        <>
          <Editor
            initialValue={content}
            defaultEditorState={title}
            height="500px"
            initialEditType="wysiwyg"
            ref={this.editorRef}
          />
        </>
        <div style={classes.btnbox}>
          <Button
            variant="contained"
            size="large"
            href="/diagnosis/qna"
            style={classes.canclebtn}
          >
            {' '}
            취소{' '}
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={modifyQnaBoard}
            style={classes.okbtn}
          >
            {' '}
            수정{' '}
          </Button>
        </div>
      </div>
    );
  }
}
export default QnAModify;
