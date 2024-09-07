import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './styles.scss';
import Button from '../forms/button';
import { signInWithGoogle, auth } from '../../firebase/utils';
import { signInWithEmailAndPassword } from 'firebase/auth';

import AuthWrapper from '../authWrapper';
import FormInput from '../forms/formInput';

const SignIn = () => {
  const initialState = {
    email: '',
    password: '',
  };

  const [formData, setFormData] = useState(initialState);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      await signInWithEmailAndPassword(auth, email, password);

      setFormData({
        ...initialState,
      });

      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const configAuthWrapper = {
    headline: '로그인',
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className='formWrap'>
        <form onSubmit={handleSubmit}>
          <FormInput
            type='email'
            name='email'
            value={formData.email}
            placeholder='이메일'
            handleChange={handleChange}
          />
          <FormInput
            type='password'
            name='password'
            value={formData.password}
            placeholder='비밀번호'
            handleChange={handleChange}
          />
          <Button type='submit'>로그인</Button>

          <div className='socialSignin'>
            <div className='row'>
              <Button onClick={signInWithGoogle}>구글 로그인</Button>
            </div>
          </div>

          <div className='resetPassword'>
            <Link to='/recovery'>비밀번호 변경</Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default SignIn;
