import React from 'react';
import Button from '../../components/forms/button';

const LoadMore = ({ onLoadMoreEvt = () => {} }) => {
  return <Button onClick={onLoadMoreEvt}>LoadMore</Button>;
};

export default LoadMore;
