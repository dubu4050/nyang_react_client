import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
const initialFValues = {
  name: 'hj',
  nick_name: 'hj',
  phone_number: '010-9250-6527',
  date: new Date(),
  authority: 'manager',
  email: 'jing0318@naver.com',
};

export default function useForm() {
  const [values, setValues] = useState(initialFValues);
  const handleInputChange = (e) => {
    const [name, value] = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  return {
    values,
    setValues,
    handleInputChange,
  };
}
