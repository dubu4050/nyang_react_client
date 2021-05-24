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
import { AlarmRounded } from '@material-ui/icons';

// 제목, 내용
var { title } = '';
var { content } = '';
var { postNo } = '';
var { category } = '';

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

const fieldes = [
  {
    value: 'free',
    label: '자유 게시판',
  },
  {
    value: 'info',
    label: '지식 정보',
  },
];

function BoardModify(props) {
  const classes = useStyles();
  const theme = createMuiTheme({
    palette: {
      primary: { main: '#666' },
    },
  });

  console.log(props.location.state);
  title = props.location.state.title;
  content = props.location.state.content;
  postNo = props.location.state.no;
  category = props.location.state.category;
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
  const onChangeCategory = (e) => {
    category = e.target.value;
  };
  const onChangeTitle = (e) => {
    title = e.target.value;
  };

  return (
    <div className={classes.infoWrap}>
      <div className={classes.listTilte}>
        <h3>게시판 글쓰기</h3>
      </div>
      <form className={classes.fieldControl} noValidate autoComplete="off">
        <TextField
          disabled
          id="fieldes"
          select
          preventValue="free"
          size="small"
          defaultValue={category}
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
          {fieldes.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <TextField
          id="title"
          variant="outlined"
          size="small"
          className={classes.title}
          defaultValue={title}
          placeholder="제목을 입력하세요"
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
    const modifyPostBoard = () => {
      if (title == '' || content == '') {
        alert('모든 항목을 채우지 않았습니다.');
      } else {
        content = this.editorRef.current.getInstance().getHtml();
        const body = {
          title: title,
          content: content,
        };
        console.log(body);
        console.log(postNo);
        // axios
        //   .put(ip + '/info/' + postNo, body)
        //   .then((res) => {
        //     alert('글 수정에 성공했습니다.');
        //     window.location.href = '/';
        //   })
        //   .catch((err) => {
        //     alert('글 등록에 실패했습니다.');
        //   });
      }
    };
    return (
      <div>
        <>
          <Editor
            initialValue={content}
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
            onClick={modifyPostBoard}
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
export default BoardModify;
