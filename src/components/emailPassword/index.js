import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.scss';

import AuthWrapper from '../authWrapper';
import FormInput from '../forms/formInput';
import Button from '../forms/button';

import { auth } from '../../firebase/utils';
import { sendPasswordResetEmail } from 'firebase/auth';

const EmailPassword = () => {
  const navigate = useNavigate();

  const initialState = {
    email: '',
    errors: [],
  };

  const [formStatus, setFormStatus] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormStatus((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { email } = formStatus;

      //   비밀번호 재설정 후 '/login' 페이지로 이동
      const config = {
        url: 'http://localhost:3000/login',
      };

      await sendPasswordResetEmail(auth, email, config)
        .then(() => {
          navigate('/login');
        })
        .catch(() => {
          const err = ['Email not found. Please try again.'];
          setFormStatus((prev) => ({
            ...prev,
            errors: err,
          }));
        });
    } catch (err) {
      console.log(err);
    }
  };

  const configAuthWrapper = {
    headline: 'Email Password',
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className='formWrap'>
        {formStatus.errors.length > 0 && (
          <ul>
            {formStatus.errors.map((err, idx) => {
              return <li key={idx}>{err}</li>;
            })}
          </ul>
        )}

        <form onSubmit={handleSubmit}>
          <FormInput
            type='email'
            name='email'
            value={formStatus.email}
            placeholder='Email'
            onChange={handleChange}
          />
          <Button type='submit'>Email Password</Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default EmailPassword;
