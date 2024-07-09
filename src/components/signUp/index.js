import React, { useState } from 'react';
import './styles.scss';

import { auth, handleUserProfile } from '../../firebase/utils';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import FormInput from '../forms/formInput';
import Button from '../forms/button';

const SignUp = () => {
  const initialState = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: [],
  };

  const [formState, setFormState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { displayName, email, password, confirmPassword } = formState;

    if (password !== confirmPassword) {
      const err = ["Password Don't match"];
      setFormState((prev) => ({
        ...prev,
        errors: err,
      }));
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await handleUserProfile(user, {
        displayName,
      });

      setFormState({
        ...initialState,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='signup'>
      <div className='wrap'>
        <h2>Signup</h2>

        {formState.errors.length > 0 && (
          <ul>
            {formState.errors.map((err, idx) => {
              return <li key={idx}>{err}</li>;
            })}
          </ul>
        )}

        <div className='formWrap'>
          <form onSubmit={handleFormSubmit}>
            <FormInput
              type='text'
              name='displayName'
              value={formState.displayName}
              placeholder='Full Name'
              onChange={handleChange}
            />
            <FormInput
              type='email'
              name='email'
              value={formState.email}
              placeholder='Email'
              onChange={handleChange}
            />
            <FormInput
              type='password'
              name='password'
              value={formState.password}
              placeholder='Password'
              onChange={handleChange}
            />
            <FormInput
              type='password'
              name='confirmPassword'
              value={formState.confirmPassword}
              placeholder='Confirm Password'
              onChange={handleChange}
            />

            <Button type='submit'>Register</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
