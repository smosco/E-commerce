import React from 'react';
import './styles.scss';

const Button = ({ children, ...otherProps }) => {
  return (
    <button className='btn' aria-label='Button' {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
