import React from 'react';
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

// 카테고리, 제목, 내용
var { category } = '';
var { title } = '';
var { content } = '';
const onChangeCategory = (e) => {
  category = e.target.value;
};
const useStyles = makeStyles((theme) => ({
  wrap: {
    marginTop: '3%',
    width: '70%',
  },
  infoWrap: { borderBottom: '0.5px solid #aaaaaa' },
  listTilte: { width: '100%', borderBottom: '0.5px solid #aaaaaa' },
  fieldControl: {
    display: 'inherit',
    marginTop: '2%',
    marginBottom: '2%',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  title: {
    width: '70%',
  },
  underline: {
    height: '40px',
  },
  field: { width: '20%' },
}));

const fieldes_a_type = [
  {
    value: 'select',
    label: '선택',
  },
  {
    value: 'free',
    label: '자유 게시판',
  },
  {
    value: 'info',
    label: '지식 정보',
  },
];

const fieldes_b_type = [
  {
    value: 'select',
    label: '선택',
  },
  {
    value: 'free',
    label: '자유 게시판',
  },
];

function BoardWrite() {
  const classes = useStyles();
  const theme = createMuiTheme({
    palette: {
      primary: { main: '#666' },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Container className={classes.wrap}>
        <FunComp></FunComp>
        <EditComp></EditComp>
      </Container>
    </ThemeProvider>
  );
}

function FunComp() {
  const classes = useStyles();

  const onChangeTitle = (e) => {
    title = e.target.value;
  };
  const role = localStorage.getItem('roleName');
  return (
    <div className={classes.infoWrap}>
      <div className={classes.listTilte}>
        <h3>게시판 글쓰기</h3>
      </div>
      <form className={classes.fieldControl} noValidate autoComplete="off">
        {(role == 'member' && <TypeB />) || <TypeA />}
        <TextField
          id="title"
          variant="outlined"
          size="small"
          className={classes.title}
          placeholder="제목을 입력하세요"
          value={title}
          onChange={onChangeTitle}
          InputProps={{
            classes: {
              underline: classes.underline,
            },
          }}
        />
      </form>
    </div>
  );
}
function TypeA() {
  const classes = useStyles();
  return (
    <TextField
      id="genus"
      select
      preventValue="free"
      size="small"
      value={category}
      onChange={onChangeCategory}
      className={classes.field}
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
      {fieldes_a_type.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </TextField>
  );
}
function TypeB() {
  const classes = useStyles();
  return (
    <TextField
      id="genus"
      select
      preventValue="free"
      size="small"
      value={category}
      onChange={onChangeCategory}
      className={classes.field}
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
      {fieldes_b_type.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </TextField>
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
    const ip = process.env.REACT_APP_API_IP;
    const classes = {
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
    const EnrollPostBoard = () => {
      if (category == undefined || title == '' || content == '') {
        alert('모든 항목을 채우지 않았습니다.');
      } else {
        content = this.editorRef.current.getInstance().getHtml();
        const body = {
          title: title,
          content: content,
        };
        if (category == 'free') {
          axios
            .post(ip + '/free', body)
            .then((res) => {
              alert('글 등록에 성공했습니다.');
              window.location.href = '/';
            })
            .catch((err) => {
              alert('글 등록에 실패했습니다.');
            });
        } else {
          axios
            .post(ip + '/info', body)
            .then((res) => {
              alert('글 등록에 성공했습니다.');
              window.location.href = '/';
            })
            .catch((err) => {
              alert('글 등록에 실패했습니다.');
            });
        }
      }
    };
    return (
      <div>
        <>
          <Editor
            height="500px"
            initialEditType="wysiwyg"
            ref={this.editorRef}
          />
        </>
        <div style={classes.btnbox}>
          <Button
            variant="contained"
            size="large"
            href="/board/info"
            style={classes.canclebtn}
          >
            {' '}
            취소{' '}
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={EnrollPostBoard}
            style={classes.okbtn}
          >
            {' '}
            등록{' '}
          </Button>
        </div>
      </div>
    );
  }
}
export default BoardWrite;
