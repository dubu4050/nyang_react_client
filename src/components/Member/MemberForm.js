import {
  makeStyles,
  TextField,
  Grid,
  Button,
  FormControl,
  FormLabel,
  Radio,
  FormControlLabel,
  RadioGroup,
} from '@material-ui/core';
import { validate } from '@material-ui/pickers';
import { ColumnController } from 'ag-grid-community';
import React, { useState, useEffect } from 'react';
import useForm from '../Common/useForm';

const authorityItems = [
  { id: 'admin', title: '관리자' },
  { id: 'editor', title: '에디터' },
  { id: 'member', title: '회원' },
];

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1),
    },
  },
}));

export default function MemberForm(props) {
  const classes = useStyles();
  const { recordFordEdit } = props;
  const [values, setValues] = useState(recordFordEdit);
  const [authority, setAuthority] = useState(values.authority);

  useEffect(() => {
    if (recordFordEdit != null)
      setValues({
        ...recordFordEdit,
      });
  }, [recordFordEdit]);

  const authorityChange = (e) => {
    setAuthority(e.target.value);
  };
  return (
    <form className={classes.root}>
      <Grid container>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            label="이름"
            name="name"
            value={values.name}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            variant="outlined"
            label="닉네임"
            name="nick_name"
            value={values.nick_name}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            variant="outlined"
            label="연락처"
            name="phone_number"
            value={values.phone_number}
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl>
            <FormLabel>권한</FormLabel>
            <RadioGroup
              row
              name="authority"
              value={authority}
              onChange={authorityChange}
            >
              {authorityItems.map((item, index) => (
                <FormControlLabel
                  value={item.id}
                  control={<Radio />}
                  label={item.title}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </form>
  );
}
