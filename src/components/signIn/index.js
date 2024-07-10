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
    headline: 'Login',
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className='formWrap'>
        <form onSubmit={handleSubmit}>
          <FormInput
            type='email'
            name='email'
            value={formData.email}
            placeholder='Email'
            handleChange={handleChange}
          />
          <FormInput
            type='password'
            name='password'
            value={formData.password}
            placeholder='Password'
            handleChange={handleChange}
          />
          <Button type='submit'>LogIn</Button>

          <div className='socialSignin'>
            <div className='row'>
              <Button onClick={signInWithGoogle}>Sign in with Google</Button>
            </div>
          </div>

          <div className='links'>
            <Link to='/recovery'>Reset Password</Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default SignIn;
